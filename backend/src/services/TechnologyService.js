import csvParser from "neat-csv"
import { TechnologyDAO, ActivityDAO, RoleDAO, runInsert, sequelize } from "../models"

export default class TechnologyService {
  /**
   * Retorna as tecnologias de uma instituição de saúde.
   *
   * @param {number} institutionID Código (PK) da instituição de saúde.
   * @param {boolean} [includeActivities=true] Se as atividades da tecnologia devem ser incluídas no retorno
   * @returns {{ id: number, name: string }[]} Todas as tecnologias relacionadas à instituição.
   */
  async listTechnologies(institutionID, includeActivities = true) {
    return TechnologyDAO.findAll({
      where: {
        $health_institution_id$: institutionID,
      },
      attributes: ["id", "name"],
      include: includeActivities && [
        {
          model: ActivityDAO,
          attributes: { exclude: ["technologyId"] },
        },
      ],
    })
  }

  /**
   * Exporta a definição de uma tecnologia (matriz atividades x ocupações).
   *
   * @param {number} technologyID ID da tecnologia cuja definição deve ser exportada.
   * @returns {TechnologyDefinition} Objeto com a definição de uma tecnologia.
   *
   * ----
   *
   * Objeto com a definição de uma tecnologia (atividades, ocupações e matriz atividade x ocupação).
   * @typedef {Object} TechnologyDefinition
   * @property {string} technologyName Nome da tecnologia.
   * @property {{ name: string; shortName: string }[]} activities Lista de atividades, com nome completo e nome curto (se cadastrado), ordenadas pelo nome.
   * @property {{ name: string; shortName: string }[]} roles Lista de ocupações, com nome completo e nome curto (se cadastrado), ordenadas pelo nome.
   * @property {(string | null)[]} matrix Matriz com a definição de quais ocupações executam quais atividades, ordenada de acordo com o array em `activities`.
   */
  async exportTechnology(technologyID) {
    const results = await TechnologyDAO.findByPk(technologyID, {
      include: [
        {
          model: ActivityDAO,
          include: [RoleDAO],
        },
      ],
    })

    const maxIDRole = Math.max(
      ...results.activities.map(activity => {
        return Math.max(
          ...activity.roles.map(role => {
            return role.id
          })
        )
      })
    )

    const maxIDActivity = Math.max(
      ...results.activities.map(activity => {
        return activity.id
      })
    )

    const grid = new Array(maxIDActivity)
    for (let i = 0; i < grid.length; i += 1) {
      grid[i] = new Array(maxIDRole).fill(null)
    }

    const arRole = new Array(maxIDRole)

    const arActiv = new Array(maxIDActivity)

    let yValue
    let xValue
    for (const activity of results.activities) {
      yValue = activity.id
      arActiv[yValue - 1] = {
        name: activity.name,
        shortName: activity.shortName,
      }
      for (const role of activity.roles) {
        xValue = role.id
        arRole[xValue - 1] = {
          name: role.name,
          shortName: role.shortName,
        }
        grid[yValue - 1][xValue - 1] = "x"
      }
    }
    let i = 0
    while (i < arActiv.length) {
      if (arActiv[i] == null) {
        arActiv.splice(i, 1)
        grid.splice(i, 1)
      } else {
        i += 1
      }
    }
    i = 0
    while (i < arRole.length) {
      if (arRole[i] == null) {
        arRole.splice(i, 1)
        for (let j = 0; j < grid.length; j += 1) {
          grid[j].splice(i, 1)
        }
      } else {
        i += 1
      }
    }

    return {
      technologyName: results.name,
      activities: arActiv,
      roles: arRole,
      matrix: grid,
    }
  }

  /**
   * Importa uma tecnologia descrita em CSV para uma instituição de saúde.
   * @param {string} csvContents Conteúdo CSV que define uma tecnologia.
   */
  async importTechnology(institutionID, csvContents) {
    // 1: parse csv data
    const { technologyName, activities, roles } = await this._parseCSVData(csvContents)

    // encapsulate everything in a transation to rollback if anything fails
    await sequelize().transaction(async t => {
      // 2: create the technology
      let technologyID
      try {
        technologyID = await TechnologyDAO.createTechnology(
          {
            name: technologyName,
            healthInstitutionId: institutionID,
          },
          t
        )
      } catch (error) {
        if (error.message === "no_name") {
          throw new Error("invalid_csv")
        } else if (error.message === "repeated") {
          throw new Error("technology_already_exists")
        }

        throw error
      }

      // 3: create activities

      // 3.1: update all activities with ID of the created technology
      activities.forEach(activity => {
        // eslint-disable-next-line no-param-reassign
        activity.technologyId = technologyID
      })

      // 3.2: save activities
      const savedActivities = await ActivityDAO.bulkCreate(activities, { transaction: t })

      // 4: create roles

      // 4.1: save roles
      const savedRoles = await RoleDAO.bulkCreate(roles, { transaction: t })

      // 4.2: update role objects with their ID to save role-activities relations
      roles.forEach((role, index) => {
        // eslint-disable-next-line no-param-reassign
        role.id = savedRoles[index].id
      })

      // 5: create relations (role <-> health institution) and (role <-> activities)

      // 5.1: role <-> health institution
      const roleHealthInstitutionRelations = roles.map(({ id }) => `(${id}, ${institutionID})`).join(", ")

      // 5.2: create role <-> activities
      const roleActivityRelations = activities.flatMap((activity, index) => {
        return activity.roles.map(role => `(${role.id}, ${savedActivities[index].id})`)
      })

      // 5.3: save relations
      await runInsert(
        `
      INSERT INTO health_institution_roles (role_id, health_institution_id)
        VALUES ${roleHealthInstitutionRelations};
      INSERT INTO role_activities (role_id, activity_id)
        VALUES ${roleActivityRelations};
      `,
        t
      )
    })
  }

  // ****************************************
  //                 PRIVATE
  // ****************************************

  /** @param {{ technologyName: string; activities: any[]; roles: any[] }} */
  async _parseCSVData(contents) {
    /** @param {string} csvName String no formato "Completo [Curto]" */
    const parseComplexName = csvName => {
      // eslint-disable-next-line prefer-const
      let [name, shortName] = csvName.split("[")

      if (shortName) {
        ;[shortName] = shortName.split("]")
      }

      return {
        name: name.trim(),
        shortName: shortName?.trim(),
      }
    }

    let csv

    try {
      csv = await csvParser(contents, { separator: ";", headers: false })
    } catch (error) {
      throw new Error("invalid_csv")
    }

    const result = {
      technologyName: "",
      activities: [],
      roles: [],
    }

    for (let index = 0; index < csv.length; index += 1) {
      const lineObject = csv[index]
      const lineArray = Object.keys(lineObject)
        .sort((a, b) => a < b)
        .map(idx => lineObject[idx])

      if (index === 0) {
        const [techName, ...roles] = lineArray
        result.technologyName = techName
        result.roles = roles.map(parseComplexName)
      } else {
        const [activityName, ...relations] = lineArray
        const filteredRoles = relations.map((included, idx) => included && result.roles[idx]).filter(role => role)

        result.activities.push({
          ...parseComplexName(activityName),
          roles: filteredRoles,
        })
      }
    }

    if (result.activities.length === 0 || !result.roles.length === 0) {
      throw new Error("invalid_csv")
    }

    return result
  }
}
