import { Router } from "express"
import { Container } from "typedi"
import { Auth, HealthInstitutionService, RoleService, TechnologyService } from "../services"
import config from "../config"

export default appRouter => {
  const router = Router() // /auth

  router.post("/", async (req, res) => {
    // parsear entradas
    const accessCode = req.body.code

    // validar entradas
    if (!accessCode) {
      res.status(400).json({
        code: "bad_request/missing_fields",
        message: "field 'code' is required",
      })
      return
    }

    // serviços necessários
    const healthInstitutionService = Container.get(HealthInstitutionService)
    const roleService = Container.get(RoleService)
    const authService = Container.get(Auth)
    const technologyService = Container.get(TechnologyService)

    // se for o código de administração do app
    if (accessCode === config.adminCode) {
      // gerar payload e retornar
      res.status(200).json({
        permission: Auth.PERMISSIONS.ADMIN_APP,
        accessToken: authService.generateToken(accessCode, Auth.PERMISSIONS.ADMIN_APP),
      })

      return
    }

    // nesse ponto, deve ser um código de um hospital
    const institutionInfos = await healthInstitutionService.getInformations(accessCode)

    // não encontrado -> código inválido
    if (!institutionInfos) {
      res.status(404).json({
        code: "not_found",
        message: "the provided code doesn't represent an active health institution",
      })
      return
    }

    const professionalRoles = await roleService.listRoles(institutionInfos.id)
    const technologies = await technologyService.listTechnologies(institutionInfos.id)

    // código válido
    res.status(200).json({
      ...institutionInfos,
      roles: professionalRoles,
      accessToken: authService.generateToken(accessCode, institutionInfos.permission),
      technologies,
      // TODO: adicionar outros dados da instituição a serem retornados: funções, tecnologias e atividades
    })
  })

  appRouter.use("/auth", router)
}
