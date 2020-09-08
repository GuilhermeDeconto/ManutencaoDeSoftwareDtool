import { Router } from "express"
import { Container } from "typedi"
import { Auth, HealthInstitutionService, TechnologyService } from "../services"

export default appRouter => {
  const router = Router() // /technologies
  const authService = Container.get(Auth)
  const healthInstitutionService = Container.get(HealthInstitutionService)
  const technologyService = Container.get(TechnologyService)

  // import technology
  router.post("/", authService.middlewares.requireHospitalAdministration, async (req, res) => {
    const healthInstitution = await healthInstitutionService.getInformations(req.auth.accessCode)
    const institutionId = healthInstitution.id

    try {
      await technologyService.importTechnology(institutionId, req.body)
    } catch (error) {
      switch (error.message) {
        case "invalid_csv":
          res.status(400).json({
            code: "bad_request/invalid_format",
            message: "the request body is not in a valid format for creating a technology",
          })
          return
        case "technology_already_exists":
          res.status(409).json({
            code: "conflic/technology_already_exists",
            message: "another technology with the same name already exists; try again with a different name",
          })
          return
        default:
          res.status(500).json({
            code: "unknown",
          })
          return
      }
    }

    // lista atualizada de tecnologias
    const technologies = await technologyService.listTechnologies(institutionId, false)
    res.json(technologies)
  })

  // list technologies
  router.get("/", authService.middlewares.requireHospitalAdministration, async (req, res) => {
    const healthInstitution = await healthInstitutionService.getInformations(req.auth.accessCode)
    const institutionId = healthInstitution.id

    const technologies = await technologyService.listTechnologies(institutionId, false)
    res.json(technologies)
  })

  appRouter.use("/technologies", router)
}
