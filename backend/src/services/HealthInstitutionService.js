import { Op } from "sequelize"
import nodemailer from "nodemailer"
import Auth from "./Auth"
import { HealthInstitutionDAO } from "../models"
import config from "../config"

export default class HealthInstitutionService {
  /**
   * Retorna a permissão de um código de instituição e as informações da instituição
   * relacionada.
   *
   * Se o código não fizer referência a nenhuma instituição conhecida, retorn `null`.
   *
   * @param {string} accessCode Código de acesso de uma instituição.
   * @returns {{ permission: string, institution: { name: string }}} Objeto com
   * permissão do código e informações da instituição. Se o código não corresponder
   * a nenhuma instituição, retorna `null`.
   */
  async getInformations(accessCode) {
    // SELECT de instituições cujo código de contagem de tempo ou gestão seja igual ao código informado
    const institution = await HealthInstitutionDAO.findOne({
      where: {
        [Op.or]: [{ timeTrackingCode: accessCode }, { administrationCode: accessCode }],
      },
    })

    // instituição não encontrada
    if (!institution) {
      return null
    }

    // definir a permissão de acordo com o campo que deu "match" no SELECT
    let permission
    if (institution.timeTrackingCode === accessCode) {
      permission = Auth.PERMISSIONS.TIME_TRACKING
    } else {
      permission = Auth.PERMISSIONS.ADMIN_HOSPITAL
    }

    return {
      id: institution.id,
      permission,
      institution: {
        name: institution.name,
      },
    }
  }

  /** @param {{name: string; email: string}} */
  async createInstitution({ name, email }) {
    // 1: get existing health institutions
    const institutions = await HealthInstitutionDAO.findAll()

    // 2: build lists with the existing codes
    const existing = institutions.reduce(
      (accumulated, institution) => {
        accumulated.timeTracking.push(institution.timeTrackingCode)
        accumulated.administration.push(institution.administrationCode)
        return accumulated
      },
      { timeTracking: [], administration: [] }
    )

    // 3: generate new codes
    const timeTrackingCode = this._generateCode(existing.timeTracking)
    const administrationCode = this._generateCode(existing.administration)

    // 4: save
    await HealthInstitutionDAO.create({
      name,
      timeTrackingCode,
      administrationCode,
    })

    // 5: send email
    let emailSent = true

    try {
      await this._sendEmail(email, { timeTrackingCode, administrationCode })
    } catch (error) {
      emailSent = false
    }

    return {
      timeTrackingCode,
      administrationCode,
      emailSent,
    }
  }

  _generateCode(invalid) {
    const allInvalid = [...invalid, config.adminCode]
    let code

    do {
      code = this._makeCode(4)
    } while (allInvalid.includes(code))

    return code
  }

  _makeCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result
  }

  async _sendEmail(address, { timeTrackingCode, administrationCode }) {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.mailUsername,
        pass: config.mailPassword,
      },
    })

    await transporter.sendMail({
      from: `Equipe dTool <${config.mailUsername}>`,
      to: address,
      subject: "dTool - Instituição cadastrada",
      html: `
      <h1>Bem-vindo ao dTool!</h1>
      <p>Use as informações abaixo para ter acesso à aplicação:
      <ul>
      <li>para contagem de tempos, use o código <b><code>${timeTrackingCode}</code></b>;</li>
      <li>para ter acesso à interface de administração, use o código <b><code>${administrationCode}</code></b>.</li>
      </ul>
      <p>
      <p><b>Equipe dTool<br>
      Agência Experimental de Engenharia de Software (AGES) - PUCRS</b></p>
      `
    })
  }
}
