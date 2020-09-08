import jwt from "jsonwebtoken"
import expressJWT from "express-jwt"
import expressJWTPermissions from "express-jwt-permissions"
import config from "../config"

/**
 * Serviço especial com utilidades relacionada a autenticação de rotas.
 *
 * Possui três responsabilidades básicas:
 * - definir os diferentes níveis de permissão de acesso (contagem de tempo, gestão e administração);
 * - prover uma forma padronizada para a geração de tokens JWT;
 * - definir e expor os middlewares necessários para garantir a autenticação e autorização das rotas.
 */
export default class Auth {
  static PERMISSIONS = {
    TIME_TRACKING: "time-tracking",
    ADMIN_HOSPITAL: "administration-hospital",
    ADMIN_APP: "administration-app",
  }

  /**
   * Gera um token JWT a partir do código de acesso e nível de autorização especificados.
   *
   * @param {string} code Código de acesso (de contagem de tempos, gestão ou administração)
   * @param {string} permission Nível de autorização do código de acesso (`"administration-hospital"`, `"time-tracking"`, ...).
   */
  generateToken(code, permission) {
    const payload = {
      accessCode: code,
      permissions: [permission],
    }

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
      notBefore: 0,
      subject: code,
      issuer: this._issuer,
      audience: "br.com.dtool.app",
    })
  }

  /**
   * Middlewares de autenticação que podem ser adicionados a rotas para garantir
   * o acesso com permissão.
   */
  middlewares = {
    /**
     * Restringe acesso a apenas usuários autenticados (com código de acesso).
     */
    authenticated: [this._requireAuthentication(), this._handleErrors],

    /**
     * Restringe o acesso a gestores e administradores da aplicação.
     */
    requireHospitalAdministration: [
      this._requireAuthentication(),
      this._requirePermissions([Auth.PERMISSIONS.ADMIN_HOSPITAL, Auth.PERMISSIONS.ADMIN_APP]),
      this._handleErrors,
    ],

    /**
     * Restringe o acesso a apenas administradores do sistema.
     */
    requireAppAdministration: [
      this._requireAuthentication(),
      this._requirePermissions([Auth.PERMISSIONS.ADMIN_APP]),
      this._handleErrors,
    ],
  }

  // ****************************************
  // PRIVATE
  // ****************************************

  _issuer = "br.com.dtool.api"

  /**
   * Middleware que valida a autenticação ao acessar uma rota.
   */
  _requireAuthentication() {
    return expressJWT({
      secret: config.jwtSecret,
      requestProperty: "auth",
      issuer: this._issuer,
    })
  }

  /**
   * Gera um middleware que verifica a autorização de acesso a uma rota.
   *
   * @param {string[]} permissions Identificadores de todos os níveis de permissão
   * que têm acesso, por exemplo, `["administration-app", "administration-hospital"]`
   * ou `["administration-app"]`.
   */
  _requirePermissions(permissions) {
    return expressJWTPermissions({
      requestProperty: "auth",
      permissionsProperty: "permissions",
    }).check(permissions.map(perm => [perm]))
  }

  /**
   * Middleware para tratamento de erros de autenticação e autorização.
   *
   * @param {*} err Objeto de erro lançado pelos middlewares anteriores.
   * @param {*} req Objeto do request em andamento.
   * @param {*} res Objeto da resposta do request em andamento.
   * @param {Function} next Função para passar o controle ao próximo middleware.
   */
  _handleErrors(err, req, res, next) {
    // erros lançados pelas libs de JWT em uso
    if (err.name === "UnauthorizedError") {
      if (err.code === "invalid_token") {
        res.status(401).json({
          code: "unauthorized",
          message: "invalid token (expired, wrong issuer, wrong signature, ...)",
        })
        return
      }

      if (err.code === "permission_denied") {
        res.status(403).json({
          code: "forbidden",
          message: "token doesn't match expected permissions",
        })
        return
      }
    }

    // nenhum erro - continuar
    next()
  }
}
