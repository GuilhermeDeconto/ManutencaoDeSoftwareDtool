import { Model, DataTypes } from "sequelize"
import HealthInstitutionDAO from "./HealthInstitutionDAO"

export default class TechnologyDAO extends Model {
  /** @param {{name: string; healthInstitutionId: number}} */
  static async createTechnology({ name, healthInstitutionId }, transaction) {
    if (!name) {
      throw new Error("no_name")
    }

    // check if it exists
    const count = await this.count({
      where: {
        name,
      },
      include: [
        {
          model: HealthInstitutionDAO,
          where: {
            id: healthInstitutionId,
          },
        },
      ],
    })

    if (count > 0) {
      throw new Error("repeated")
    }

    // all checks passed; create
    const result = await this.create({ name, healthInstitutionId }, { transaction })
    return result.id
  }
}

export const setup = sequelize => {
  TechnologyDAO.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: "technology" }
  )
}
