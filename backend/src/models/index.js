import { QueryTypes } from "sequelize"
import HealthInstitutionDAO from "./HealthInstitutionDAO"

export { default as HealthInstitutionDAO } from "./HealthInstitutionDAO"
export { default as TechnologyDAO } from "./TechnologyDAO"
export { default as ActivityDAO } from "./ActivityDAO"
export { default as RoleDAO } from "./RoleDAO"
export { default as ExecutionDAO } from "./ExecutionDAO"
export { default as RoleActivityDAO } from "./RoleActivityDAO"

export const sequelize = () => {
  return HealthInstitutionDAO.sequelize
}

export const runInsert = (sqlString, transaction) => {
  return sequelize().query(sqlString, { type: QueryTypes.INSERT, transaction })
}
