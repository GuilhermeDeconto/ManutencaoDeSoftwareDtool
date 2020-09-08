import { Router } from "express"
import auth from "./auth"
import healthInstitution from "./healthInstitution"
import executions from "./executions"
import reports from './reports'
import technologies from './technologies'

export default () => {
  const appRouter = Router()

  // routes
  auth(appRouter)
  healthInstitution(appRouter)
  executions(appRouter)
  reports(appRouter)
  technologies(appRouter)

  return appRouter
}
