import { ActivityDAO, TechnologyDAO } from "../models"

export default class ActivityService {
  /**
   * @param {string} technologyID Código (PK) da tecnologia.
   *
   * @returns {{ id: integer, name: string, shortName: string }[]} Todas as atividades da atividade
   */
  async listActivities(technologyID) {
    const technology = await TechnologyDAO.findByPk(technologyID, {
      include: ActivityDAO,
    })

    return technology?.activities.map(activity => {
      return {
        id: activity.id,
        name: activity.name,
        shortName: activity.shortName,
      }
    })
  }
}
