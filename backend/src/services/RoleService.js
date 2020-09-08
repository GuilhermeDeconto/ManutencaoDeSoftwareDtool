import { RoleDAO, HealthInstitutionDAO, ActivityDAO } from "../models"

export default class RoleService {
  /**
   * @param {string} institutionID Código (PK) da instituição de saúde.
   *
   * @returns {{ id: string, name: string, description: string }[]} Todas funções da instituição
   */
  async listRoles(institutionID) {
    const institution = await HealthInstitutionDAO.findByPk(institutionID, {
      include: RoleDAO,
    })

    const roles = institution?.roles.map(role => {
      return {
        id: role.id,
        name: role.name,
        shortName: role.shortName
      }
    })

    for (const role of roles) {
      const activityFromId = await RoleDAO.findByPk(role.id, {
        include: ActivityDAO,
      })

      role.activities = activityFromId.activities.map(activity => {
        return {
          id: activity.id,
          name: activity.name,
          shortName: activity.shortName,
        }
      })
    }

    return roles
  }
}
