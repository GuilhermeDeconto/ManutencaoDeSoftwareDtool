import configLoader from "./config"
import loggerLoader from "./logger"
import expressLoader from "./express"
import sequelizeLoader from "./sequelize"
import jobsLoader from "./jobs"

/* eslint-disable no-console */

export default async app => {
  // environment
  await configLoader()
  console.info("✅ Environment variables loaded")

  // logging
  await loggerLoader(app)
  console.info("✅ Logger loaded")

  // express (routes)
  await expressLoader(app)
  console.info("✅ Express loaded")

  // database
  await sequelizeLoader()
  console.info("✅ Sequelize loaded")

  // jobs
  await jobsLoader()
  console.info("✅ Jobs loaded and started")
}
