import { Router } from "express"
import { Container } from "typedi"
import { Auth, ExecutionService } from "../services"

export default appRouter => {
  const router = Router()
  const authService = Container.get(Auth)

  // Validação do Codigo de Entrada
  router.post("/", authService.middlewares.authenticated, async (req, res) => {
    const executionService = Container.get(ExecutionService)
    const { deviceToken, executions } = req.body

    // Confere se o Token for vazio e se não tiver nenhuma execução
    if (deviceToken == null || executions.length <= 0) {
      res.status(400).json({
        code: "bad_request/missing_fields",
        message: "fields 'deviceToken' and 'executions' are required, and there should be at least one execution",
      })
      return
    }

    for (const item of executions) {
      const { activityId, roleId, timestamp, endDate, duration } = item

      // Confere se os valores não são nulos e se tiverem dados faltando
      if (activityId == null || roleId == null || timestamp == null || endDate == null || duration == null) {
        res.status(400).json({
          code: "bad_request/missing_fields",
          message: "fields `activityId`, `roleId`, `timestamp`, `endDate` and `duration` are required on all executions",
        })
        return
      }
    }

    // Se passar do for, esta tudo certo com os dados e o payload tem uma ou mais execuções a serem enviadas ao banco
    await executionService.createExecution(req.body)
    res.status(201).send()
  })
  appRouter.use("/executions", router)
}
