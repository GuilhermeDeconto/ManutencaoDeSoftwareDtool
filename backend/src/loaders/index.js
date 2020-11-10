import configLoader from "./config"
import loggerLoader from "./logger"
import expressLoader from "./express"
import sequelizeLoader from "./sequelize"
import jobsLoader from "./jobs"

/* eslint-disable no-console */

export default async app => {
  // environment
  configLoader()
  console.info("✅ Environment variables loaded")

  // logging
  loggerLoader(app)
  console.info("✅ Logger loaded")

  // express (routes)
  expressLoader(app)
  console.info("✅ Express loaded")

  // database
  await sequelizeLoader()
  console.info("✅ Sequelize loaded")

  // jobs
  jobsLoader()
  console.info("✅ Jobs loaded and started")
}
