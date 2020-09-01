import { Alert } from "react-native";
import moment, { Moment } from "moment";
import {
  addFinishedExecution,
  addOngoingExecution,
  getOngoingExecutions,
  setOngoingExecution,
  removeOngoingExecution,
} from "./localStorage";
import {
  ExecutionStatus,
  OngoingExecution,
  FinishedExecution,
  CardExecutionType,
} from "./types";
import { syncExecutions } from "./appService";

/**
 * Coordena o a manipulação de execuções.
 *
 * O objetivo é centralizar as funções relacionadas à execuções, de forma a
 * não poluir as Screens que em que serão utilizadas e que mudanças necessárias
 * sejam automaticamente propagadas a todas as telas que necessitem trabalhar com
 * execuções.
 *
 */

/** Função responsável por criar uma nova execução de atividade
 * @param cardInfo, com os dados para execução atual
 */
export const createExecution = async (cardInfo: CardExecutionType) => {
  const startTime: Moment = moment();
  const strStartTime: string = startTime.format("YYYY-MM-DDTHH:mm:ssZZ");
  console.log(
    "timerFunction.createExecution: Criando execução - Horário atual: ",
    strStartTime
  );

  const newExecution: OngoingExecution = {
    startTime: strStartTime,
    elapsedTime: 0,
    latestStartTime: startTime,
    idPatient: cardInfo.idPatient,
    role: cardInfo.role,
    activity: cardInfo.activity,
    currentState: ExecutionStatus.Uninitialized,
  };
  await addOngoingExecution(newExecution);
};

/** Função responsável por iniciar contagem de tempo de uma execução de atividade
 * Retorna true se foi possível iniciar, podendo determinar a criação de setInterval()
 * para fazer update de todas as execuções
 * @param index, índice do objeto no array de execuções de atividade
 */
export const initializeExecution = async (index: number) => {
  let isInitialized: boolean;
  let execution = await getSingleOngoingExecution(index);
  if (execution === null) {
    return false;
  }
  if (
    execution.currentState === ExecutionStatus.Paused ||
    execution.currentState === ExecutionStatus.Uninitialized
  ) {
    const startTime: Moment = moment();
    const strTime: string = startTime.format("YYYY-MM-DDTHH:mm:ssZZ");
    console.log(
      "timerFunction.initializeExecution: Inicializando execução - Horário atual: ",
      strTime
    );
    if (execution.currentState === ExecutionStatus.Uninitialized) {
      execution.startTime = strTime;
    }

    execution.latestStartTime = startTime;
    execution.currentState = ExecutionStatus.Initialized;

    await setOngoingExecution(execution, index);
    isInitialized = true;
  } else {
    isInitialized = false;
  }
  return isInitialized;
};

/** Função responsável por pausar uma execução e no momento, o elapsedTime é calculado ao pausar
 * @param index, índice da execução a ser pausada no array
 */
export const pauseExecution = async (index: number) => {
  let execution = await getSingleOngoingExecution(index);
  if (execution === null) {
    return false;
  }
  if (execution.currentState === ExecutionStatus.Initialized) {
    execution = addElapsedTime(execution);
    execution.currentState = ExecutionStatus.Paused;
    await setOngoingExecution(execution, index);
    return true;
  }

  console.warn("Execution not running");
  return false;
};

const showExecutionAlert = (type: "remove" | "cancel"): Promise<boolean> => {
  const [action, capitalizedAction] =
    type === "remove" ? ["remover", "Remover"] : ["cancelar", "Cancelar"];
  const title = `${capitalizedAction} atividade?`;
  const message = `Se você ${action} essa atividade, o tempo gasto nela não será contabilizado.`;
  const yesButtonText = `Sim, ${action}`;

  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: yesButtonText,
          style: "destructive",
          onPress: () => resolve(true),
        },
        { text: "Não, voltar", style: "cancel", onPress: () => resolve(false) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) }
    );
  });
};

/** Função responsável por cancelar uma execução
 * @param index, índice da execução a ser removida do array
 */
export const cancelExecution = async (index: number) => {
  const confirmed = await showExecutionAlert("remove");
  if (confirmed) {
    await removeOngoingExecution(index);
    return true;
  }
  return false;
};

/** Função responsável por finalisar uma execução, removendo-a da lista de
 * execuções correntes e passando para a lista de execuções a serem enviadas ao BD
 * @param index, índice da execução a ser removida do array e adicionada ao outro
 */
export const finishExecution = async (index: number) => {
  let execution = await getSingleOngoingExecution(index);
  if (execution === null) {
    return false;
  }

  console.log("timerFunction.finishExecution: Finalizando execução");
  if (
    execution.currentState === ExecutionStatus.Paused ||
    execution.currentState === ExecutionStatus.Initialized
  ) {
    if (execution.currentState === ExecutionStatus.Initialized) {
      execution = addElapsedTime(execution);
    }
    execution.currentState = ExecutionStatus.Finished;
    await removeOngoingExecution(index);
    const newFinishedExecution: FinishedExecution = {
      activity: execution.activity,
      role: execution.role,
      date: execution.startTime,
      duration: execution.elapsedTime,
      endDate: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
    };

    await addFinishedExecution(newFinishedExecution);

    try {
      await syncExecutions();
    } catch (error) {
      // no-op
    }

    return true;
  }
  console.error("Execução nunca foi iniciada.");
  await removeOngoingExecution(index);
  return false;
};

/** Função responsável por atualizar contagem de toda a lista de execuções em andamento.
 *  Retorna `false` se não há execuções em andamento e `true` se há.
 */
export const updateAllTimers = async () => {
  let hasOngoingExecution = false;
  let execution: OngoingExecution;

  const executions: OngoingExecution[] = await getOngoingExecutions();
  if (!executions || executions.length === 0) {
    console.warn("Não há execuções.");
    return hasOngoingExecution;
  }

  executions.map((exec, i) => {
    if (exec.currentState === ExecutionStatus.Initialized) {
      hasOngoingExecution = true;

      execution = addElapsedTime(exec);
      setOngoingExecution(execution, i);
    }
    return hasOngoingExecution;
  });

  return hasOngoingExecution;
};

/** Recebe tempo em segundos e devolve string formatada corretamente.
 * @param time, tempo em segundos que deve ser formatado
 */
export const timeToString = (time: number) => {
  const strTime = moment.unix(time).utc().format("HH:mm:ss");
  console.log(strTime);
  return strTime;
};
/** Função responsável por retornar o status de execução de uma execução específica
 * @param index, índice da execução cujo status irá ser retornado
 */
export const getExecutionStatus = async (index: number) => {
  let execution = await getSingleOngoingExecution(index);
  if (execution === null) {
    console.warn(`Execução ${index} não encontrada`);
    return null;
  }
  return execution.currentState;
};

/** Atualiza os valores de tempo de um objeto adicionando o tempo atual percorrido
 * @param execution, objeto a receber os valores de tempo atualizados
 */
const addElapsedTime = (execution: OngoingExecution) => {
  const pauseTime: Moment = moment();
  console.log(
    "timerFunction.addElapsedTime: Horário atual: ",
    pauseTime.format("YYYY-MM-DDTHH:mm:ss[Z]ZZ")
  );
  console.log(
    "timerFunction.addElapsedTime: Contagem até este momento: ",
    execution.elapsedTime
  );

  const diffTime: number = Math.round(
    moment.duration(pauseTime.diff(execution.latestStartTime)).asSeconds()
  );
  console.log(
    "timerFunction.addElapsedTime: Contagem a ser adicionada: ",
    diffTime
  );
  const newElapsedTime: number = execution.elapsedTime + diffTime;
  console.log(
    "timerFunction.addElapsedTime: Pausando execução - Contagem atual: ",
    newElapsedTime
  );
  execution.elapsedTime = newElapsedTime;
  execution.latestStartTime = pauseTime;
  return execution;
};

/** Função que retorna um único objeto da lista de objetos a partir do indice especificado
 * @param index, o indice da lista onde o objeto deve ser obtido e retornado
 */
const getSingleOngoingExecution = async (index: number) => {
  const lstExecution = await getOngoingExecutions();
  if (!lstExecution || lstExecution.length === 0) {
    console.warn("Não há execuções.");
    return null;
  }

  if (lstExecution.length > index) {
    const execution: OngoingExecution = lstExecution[index];
    return execution;
  }

  console.error("Invalid index position");
  return null;
};
