import { Model, DataTypes } from "sequelize"
import ExecutionDAO from "./ExecutionDAO"

export default class RoleActivityDAO extends Model {
  
  static async updateRoleActivityMetrics() {
    const allRoleActivityData = await RoleActivityDAO.findAll()

    for (const roleActivity of allRoleActivityData) {
    
      ExecutionDAO.findAll({
        attributes: [
          [this.sequelize.fn('max', this.sequelize.col('duration')), 'max'],
          [this.sequelize.fn('median', this.sequelize.col('duration')), 'median'],
          [this.sequelize.fn('min', this.sequelize.col('duration')), 'min']
        ],
        raw: true,
        where: { role_id: roleActivity.roleId, activity_id: roleActivity.activityId }
      }).then(minMaxMedian => {
        
        RoleActivityDAO.update({
          minimum: minMaxMedian[0].min,
          median: minMaxMedian[0].median,
          maximum: minMaxMedian[0].max,
          lastUpdate: (new Date()).toISOString(),
        },
        { where : { role_id: roleActivity.roleId, activity_id: roleActivity.activityId}})

      })
    }
  }

  static async retrieveRoleActivityMetrics(technologyID) {
    return this.sequelize.query(
      `SELECT activity_id, activities.name as activity, role_id, roles.name as role, minimum/60 as minimum, median/60 as median, maximum/60 as maximum, last_update
       FROM role_activities
       INNER JOIN activities ON role_activities.activity_id = activities.id
       INNER JOIN roles ON role_activities.role_id = roles.id
       WHERE activities.technology_id = ?;`,
       {
         replacements: [technologyID],
       }
     )
  }

}

export const setup = sequelize => {
  RoleActivityDAO.init({
    minimum: DataTypes.DOUBLE,
    median: DataTypes.DOUBLE,
    maximum: DataTypes.DOUBLE,
    lastUpdate: DataTypes.DATE,
  }, { sequelize, modelName: "role_activity" })
}
