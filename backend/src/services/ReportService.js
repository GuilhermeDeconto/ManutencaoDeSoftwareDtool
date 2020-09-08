import Excel from "exceljs"
import { Container } from "typedi"
import TechnologyService from "./TechnologyService"
import ExecutionService from "./ExecutionService"

export default class ReportService {
  /**
   * Gera um relatório completo com todos os dados de uma instituição de saúde.
   *
   * @param {number} institutionID ID da instituição cujo relatório deve ser gerado.
   * @returns {Promise<{ write: (import('stream').Stream) => Promise<void> }>} Nome do arquivo XLSX temporário.
   */
  async generateCompleteReport(institutionID) {
    // Cria arquivo e adiciona algumas propriedades
    const workbook = new Excel.Workbook()
    workbook.creator = "dTool - AGES, PUCRS"
    workbook.lastModifiedBy = "dTool - AGES, PUCRS"
    workbook.created = new Date()

    // Cria serviços que serão usados
    const technologyService = Container.get(TechnologyService)
    const executionService = Container.get(ExecutionService)

    // Obtém as tecnologias da instituicão e para cada uma delas adiciona três abas
    const technologies = await technologyService.listTechnologies(institutionID)
    for (const tech of technologies) {
      // Adiciona aba "TECH - Definição"
      const definitions = workbook.addWorksheet(`${tech.name} - Definição`, {
        properties: {
          defaultColWidth: 20,
          defaultRowHeight: 32,
        },
        views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
      })
      const exportedTechnologies = await technologyService.exportTechnology(tech.id)

      definitions.columns = [{ header: " ", key: "activity" }]

      for (let i = 0; i < exportedTechnologies.roles.length; i += 1) {
        const { name, shortName } = exportedTechnologies.roles[i]
        const role = shortName ? `${name} [${shortName}]` : name
        definitions.columns = definitions.columns.concat([{ header: role, outlineLevel: 1, height: 32, width: 20 }])
      }

      for (let i = 0; i < exportedTechnologies.activities.length; i += 1) {
        const { name, shortName } = exportedTechnologies.activities[i]
        const activity = shortName ? `${name} [${shortName}]` : name
        definitions.addRow([activity, ...exportedTechnologies.matrix[i]])
      }

      definitions.getCell(1, 1).value = exportedTechnologies.technologyName

      const firstRow = definitions.getRow(1)
      firstRow.height = 48
      firstRow.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      }
      firstRow.border = { bottom: { style: "thin" } }

      const firstColumn = definitions.getColumn(1)
      firstColumn.width = 30
      firstColumn.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      }
      firstColumn.border = { right: { style: "thin" } }

      definitions.eachRow(row => {
        /* eslint-disable no-param-reassign */

        row.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        }

        row.font = {
          name: "Arial",
          size: 10,
          bold: false,
        }

        /* eslint-enable no-param-reassign */
      })

      // Adiciona aba "TECH - Execuções"
      const executions = workbook.addWorksheet(`${tech.name} - Execuções`, {
        views: [{ state: "frozen", ySplit: 1 }],
      })
      executions.columns = [
        { header: "Atividade", key: "activity", width: 56 },
        { header: "Ocupação", key: "role", width: 56 },
        { header: "Início", key: "timestamp", width: 25, style: { numFmt: "dd/MM/yyyy\\ hh:mm:ss.SSS" } },
        { header: "Fim", key: "endDate", width: 25, style: { numFmt: "dd/MM/yyyy\\ hh:mm:ss.SSS" } },
        { header: "Duração (minutos)", key: "duration", width: 25 },
        { header: "Dispositivo", key: "deviceToken", width: 40, style: { alignment: { horizontal: "right" } } },
      ]

      const exportExecutions = await executionService.exportExecutions(tech.id)

      const executionsFirstRow = executions.getRow(1)
      executionsFirstRow.height = 32
      executionsFirstRow.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      }

      executionsFirstRow.font = {
        name: "Arial",
        size: 10,
        bold: true,
      }

      executions.addRows(
        exportExecutions.map(execution => {
          return {
            ...execution,
            timestamp: new Date(execution.timestamp),
          }
        })
      )

      // Adiciona aba "TECH - Consolidado"
      const consolidatedExecutions = workbook.addWorksheet(`${tech.name} - Consolidado`, {
        views: [{ state: "frozen", ySplit: 1 }],
      })
      consolidatedExecutions.columns = [
        { header: "Atividade", key: "activity", width: 56 },
        { header: "Ocupação", key: "role", width: 56 },
        { header: "Mínimo (minutos)", key: "minimumDuration", width: 14 },
        { header: "Mediana (minutos)", key: "medianDuration", width: 14 },
        { header: "Máximo (minutos)", key: "maximumDuration", width: 14 },
      ]

      const exportConsolidatedExecutions = await executionService.exportConsolidatedExecutions(tech.id)

      const consolidatedFirstRow = consolidatedExecutions.getRow(1)
      consolidatedFirstRow.height = 32
      consolidatedFirstRow.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      }
      consolidatedFirstRow.font = {
        name: "Arial",
        size: 10,
        bold: true,
      }

      consolidatedExecutions.addRows(exportConsolidatedExecutions)
    }

    return workbook.xlsx
  }
}
