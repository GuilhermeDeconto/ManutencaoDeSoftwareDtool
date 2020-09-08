import { Router } from "express"
import { Container } from "typedi"
import { validate as isEmailValid } from "email-validator"
import { Auth, HealthInstitutionService } from "../services"

export default appRouter => {
  const router = Router() // /health_institutions
  const authService = Container.get(Auth)
  const healthInstitutionService = Container.get(HealthInstitutionService)

  // create health institution
  router.post("/", authService.middlewares.requireAppAdministration, async (req, res) => {
    const { institutionName, administrationEmail } = req.body

    if (!institutionName || !administrationEmail) {
      res.status(400).json({
        code: "bad_request/missing_fields",
        message: "fields 'institutionName' and 'administrationEmail' are required and shouldn't be empty",
      })
      return
    }

    if (!isEmailValid(administrationEmail)) {
      res.status(400).json({
        code: "bad_request/invalid_format",
        message: "field 'administrationEmail' is not valid"
      })
      return
    }

    const result = await healthInstitutionService.createInstitution({
      name: institutionName,
      email: administrationEmail
    })

    const responsePayload = {
      timeTrackingCode: result.timeTrackingCode,
      administrationCode: result.administrationCode,
    }

    if (!result.emailSent) {
      responsePayload.error = {
        code: "internal/email-not-sent",
        message: "failed to send e-mail with access codes"
      }
    }
    
    res.json(responsePayload)
  })

  appRouter.use("/health_institutions", router)
}
