import { Model, DataTypes, QueryTypes } from "sequelize"

export default class ExecutionDAO extends Model {
  static async getExecutionsReport(technologyID) {
    return this.sequelize.query(
      `
      SELECT A.name AS activity, R.name AS role, E.timestamp AS timestamp, E.end_date AS "endDate", E.duration / 60 AS duration, E.device_token AS "deviceToken"
      FROM executions AS E INNER JOIN role_activities AS RA ON E.role_id = RA.role_id AND E.activity_id = RA.activity_id
      INNER JOIN roles AS R ON RA.role_id = R.id
      INNER JOIN activities AS A ON RA.activity_id = A.id
      WHERE A.technology_id = :tech_id
      ORDER BY timestamp`,
      {
        type: QueryTypes.SELECT,
        replacements: { tech_id: technologyID },
      }
    )
  }
}

export const setup = sequelize => {
  ExecutionDAO.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // role_activities.role_id não é UNIQUE,
        // logo não tem como usar `references` do Sequelize
      },
      activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // role_activities.activity_id não é UNIQUE,
        // logo não tem como usar `references` do Sequelize
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      deviceToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "execution" }
  )
}
