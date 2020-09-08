import { Model, DataTypes } from "sequelize"

export default class ActivityDAO extends Model {}

export const setup = sequelize => {
  ActivityDAO.init(
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
    { sequelize, modelName: "activity" }
  )
}
