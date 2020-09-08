import express from "express"
import routes from "../routes"

export default app => {
  // middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.text({ type: "text/*" }))

  // routes
  app.use("/api", routes())
}
