import { CronJob } from "cron"
import { Container } from "typedi"
import config from "../config"
import { ExecutionService } from "../services"

/**
 * Job para atualizar o relatório consolidados das execuções.
 * 
 * Configurado por `config.reportsCronFrequency`, atualiza toda a tabela de
 * atividades x ocupações com as novas durações mínima, mediana e máxima para
 * cada entrada na tabela.
 */
export default () => {
  new CronJob(config.reportsCronFrequency, () => {
    (async () => {
      const executionService = Container.get(ExecutionService)
      await executionService.updateConsolidatedReport()
    })()
  }).start()
}
