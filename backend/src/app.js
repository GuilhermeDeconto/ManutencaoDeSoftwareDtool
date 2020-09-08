import express from "express"
import loaders from "./loaders"
import config from "./config"

/* eslint-disable no-console */

const startServer = async () => {
  const app = express()

  await loaders(app)

  app.listen(config.port, error => {
    if (error) {
      console.error("❌ Oops...")
      console.error(error)
      process.exit(1)
      return
    }

    console.info(`ℹ️ Server listening on port ${config.port}`)
  })
}

startServer()
