import { Model, DataTypes } from "sequelize"

export default class RoleDAO extends Model {}

export const setup = sequelize => {
  RoleDAO.init(
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
      shortName: DataTypes.STRING,
    },
    { sequelize, modelName: "role" }
  )
}
