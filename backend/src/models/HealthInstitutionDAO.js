import { Model, DataTypes } from "sequelize"

export default class HealthInstitutionDAO extends Model {}

export const setup = sequelize => {
  HealthInstitutionDAO.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeTrackingCode: {
        type: DataTypes.CHAR(4),
        allowNull: false,
        unique: true,
      },
      administrationCode: {
        type: DataTypes.CHAR(4),
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: "health_institution" }
  )
}
