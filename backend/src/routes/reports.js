import { Router } from "express"
import { Container } from "typedi"
import { Auth, HealthInstitutionService, ExecutionService, ReportService } from "../services"

export default appRouter => {
  const router = Router() // /reports
  const authService = Container.get(Auth)

  // relatório simples (para gráficos do app)
  router.get("/simple", authService.middlewares.authenticated, async (req, res) => {
    let { technology, role } = req.query
    technology = parseInt(technology, 10)
    role = parseInt(role, 10);

    if (!technology || !role) {
      res.status(400).json({
        code: "bad_request/missing_query_params",
        message: "Either 'technology' and 'role' values are required.",
      })
      return
    }

    const executionService = Container.get(ExecutionService)
    const reportSimple = await executionService.exportConsolidatedExecutions(technology)

    const reportSimpleFilteredByRole = reportSimple.filter(rep => rep.roleID === role)
    
    if (Object.keys(reportSimpleFilteredByRole).length === 0) {
      res.status(404).json({
        code: "not_found/no_data_found",
        message: "There is no metrics related to this technology and role",
      })
      return
    }

    res.status(200).json(reportSimpleFilteredByRole)
  })

  // relatório completo (para gestores, XLSX)
  router.get("/complete", authService.middlewares.requireHospitalAdministration, async (req, res) => {
    // instituição vem a partir do token da autenticação; usar código de acesso para saber ID da instituição

    const healthInstitutionService = Container.get(HealthInstitutionService)
    const institution = await healthInstitutionService.getInformations(req.auth.accessCode)

    const reportService = Container.get(ReportService)
    const temporaryFile = await reportService.generateCompleteReport(institution.id)

    res.status(200).attachment(`Relatório dTool - ${institution.institution.name}.xlsx`)

    await temporaryFile.write(res)
    
    res.send()
  })

  appRouter.use("/reports", router)
}
