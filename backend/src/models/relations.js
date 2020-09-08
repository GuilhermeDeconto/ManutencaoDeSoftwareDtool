import HealthInstitutionDAO from "./HealthInstitutionDAO"
import TechnologyDAO from "./TechnologyDAO"
import ActivityDAO from "./ActivityDAO"
import RoleDAO from "./RoleDAO"
import RoleActivityDAO from "./RoleActivityDAO"

/* eslint-disable import/prefer-default-export */

export const setup = () => {
  const notNullForeignKey = { foreignKey: { allowNull: false } }

  // health institutions + technologies
  HealthInstitutionDAO.hasMany(TechnologyDAO, notNullForeignKey)
  TechnologyDAO.belongsTo(HealthInstitutionDAO, notNullForeignKey)

  // technologies + activities
  TechnologyDAO.hasMany(ActivityDAO, notNullForeignKey)
  ActivityDAO.belongsTo(TechnologyDAO, notNullForeignKey)

  // health institutions + roles
  HealthInstitutionDAO.belongsToMany(RoleDAO, { through: "health_institution_roles" })
  RoleDAO.belongsToMany(HealthInstitutionDAO, { through: "health_institution_roles" })

  // roles + activities
  const throughRoleActivity = {
    through: {
      model: RoleActivityDAO,
      unique: true,
    },
  }

  RoleDAO.belongsToMany(ActivityDAO, throughRoleActivity)
  ActivityDAO.belongsToMany(RoleDAO, throughRoleActivity)

  // role_activities + executions: tem de ser feita manualmente e depois da chamada ao sync,
  // porque o sequelize não suporta FKs compostas (https://github.com/sequelize/sequelize/issues/311)
}
