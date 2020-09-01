import {
  addCardItem,
  addObjectItem,
  addPatientItem,
  getArray,
  getObject,
  ifIdExists,
  mergeObject,
  removeItem,
  removeObjectItem,
  removeObjectItemV2,
  setObject,
  setObjectItem,
  setItem,
  getItem,
} from "./asyncStorageAdapter";
import {
  Auth,
  Card,
  FinishedExecution,
  LocalData,
  OngoingExecution,
  Patient,
  Preferences,
  Role,
  Session,
  Technology,
} from "./types";

/**
 * Coordena o armazenamento de informações locais, usando o AsyncStorage.
 *
 * O objetivo é abstrair a localização das informações no AsyncStorage, de modo
 * que uma mudança na estruturas da informações necessite de mudanças apenas nas
 * funções deste arquivo.
 *
 * As informações são armazenadas de forma "escopada" conforme o uso de cada dado:
 *
 * - "@auth": dados relacionados a autenticação (código de acesso, token e permissão);
 * - "@data": dados do hospital relacionado ao código de acesso (se o código
 * usado for de contagem de tempo ou gestão), ou dos hospitais do sistema (se o
 * código usado for de administração);
 * - "@executions": execuções locais ainda não persistidas no servidor;
 * - "@preferences": 'preferências' do usuário (ID da tecnologia e ocupação, se
 * o usuário escolheu a função "Lembrar tecnologia/ocupação");
 * - "@patient": lista local de pacientes sendo atendidos pelo usuário;
 * - "@session": informações de sessão (por exemplo, o ID da tecnologia em uso
 * quando o usuário opta por *não* lembrar a tecnologia; isso é persistido
 * localmente porque é usado em vários pontos no resto do app).
 *
 * Não há uma relação 1:1 entre as informações armazenadas e as funções neste
 * arquivo; por exemplo, não necessariamente haverá exatamente um par de funções
 * `set` e `get` para cada categoria de dado armazenado. As funções são criadas
 * conforme for sendo necessário o seu uso em outras partes da aplicação.
 */

/** Funções auxiliares */
export {
  addCardItem,
  addObjectItem,
  addPatientItem,
  clear,
  getArray,
  getItem,
  ifIdExists,
  removeItem,
  removeObjectItem,
  removeObjectItemV2,
  setItem,
} from "./asyncStorageAdapter";

/** Salva os dados retornados na rota de autenticação localmente, para uso pelo app. */
export const saveData = async (remoteData: any) => {
  const { accessToken, permission } = remoteData;
  await mergeObject("@auth", { token: accessToken, permission });

  if (
    remoteData.permission === "time-tracking" ||
    remoteData.permission === "administration-hospital"
  ) {
    const { institution, roles, technologies } = remoteData;

    let orderedRoles = roles as Role[];
    let orderedTechnologies = technologies as Technology[];
    orderedRoles = orderedRoles.sort((a, b) =>
      a.name.toUpperCase().localeCompare(b.name.toUpperCase())
    );
    for (let i = 0; i < orderedRoles.length; i++) {
      orderedRoles[i].activities = orderedRoles[i].activities.sort((a, b) =>
        a.name.toUpperCase().localeCompare(b.name.toUpperCase())
      );
    }
    orderedTechnologies = orderedTechnologies.sort((a, b) =>
      a.name.toUpperCase().localeCompare(b.name.toUpperCase())
    );
    const obj = {
      institution,
      roles: orderedRoles,
      technologies: orderedTechnologies,
    };
    // salvar dados locais
    await setObject("@data", obj);

    // validar se a tecnologia e ocupação previamente selecionadas ainda existem
    const preferences = await getPreferences();

    if (preferences.technology) {
      const stillExists = technologies.some(
        (tech: { id: number }) => tech.id === preferences.technology
      );

      if (!stillExists) {
        delete preferences.technology;
      }
    }

    if (preferences.role) {
      const stillExists = roles.some(
        (role: { id: number }) => role.id === preferences.role
      );

      if (!stillExists) {
        delete preferences.role;
      }
    }

    await setObject("@preferences", preferences);
  } else {
    // TODO: implementar para demais perfis
  }
};

/** Retorna os dados locais de acordo com a permissão do código de acesso usado. */
export const getData = () => getObject<LocalData>("@data");

/** Retorna os dados de autenticação. */
export const getAuth = () => getObject<Auth>("@auth");

/** Atualiza os dados de autenticação com o novo código de acesso. */
export const setAccessCode = (code: string) => mergeObject("@auth", { code });

/** Retorna as 'preferências' do usuário. */
export const getPreferences = () => getObject<Preferences>("@preferences");

/** Retorna as informações da sessão de uso do app. */
export const getSession = () => getObject<Session>("@session");

/** Adiciona a lista de pacientes salva localmente, se ja nao existir */
export const addPatient = (newPatient: Patient) =>
  addPatientItem("@patient", newPatient);

/** Retorna paciente da lista salva localmente a partir de seu id, se existir */
export const getPatient = (id: string) => ifIdExists("@patient", id);

/** Remove paciente da lista salva localmente a partir de seu índice no array */
export const removePatient = (index: number) =>
  removeObjectItem("@patient", index);

/** Adiciona a lista de cards salva localmente */
export const addCard = (newCard: Card) => addCardItem("@Card", newCard);

/** Retorna toda a lista de cards salva localmente */
export const getCards = () => getArray<Card>("@Card");

/** Altera um objeto em dado index na lista de execucoes em andamento salva localmente */
export const setCard = (newItem: Card, index: number) =>
  setObjectItem("@Card", newItem, index);

/** Remove um objeto em dado index na lista de execucoes em andamento salva localmente */
export const removeCard = (index: number) => removeObjectItemV2("@Card", index);

/** Adiciona a lista de execucoes concluidas salva localmente */
export const addFinishedExecution = (newExecution: FinishedExecution) =>
  addObjectItem("@finishedExecution", newExecution);

/** Retorna toda a lista de execucoes concluidas salva localmente */
export const getFinishedExecutions = () =>
  getArray<FinishedExecution>("@finishedExecution");

/** Reseta toda a lista de execucoes concluidas salva localmente */
export const resetFinishedExecutions = () => removeItem("@finishedExecution");

/** Adiciona a lista de execucoes em andamento salva localmente */
export const addOngoingExecution = (newExecution: OngoingExecution) =>
  addObjectItem("@ongoingExecution", newExecution);

/** Retorna toda a lista de execucoes em andamento salva localmente */
export const getOngoingExecutions = () =>
  getArray<OngoingExecution>("@ongoingExecution");

/** Altera um objeto em dado index na lista de execucoes em andamento salva localmente */
export const setOngoingExecution = (newItem: OngoingExecution, index: number) =>
  setObjectItem("@ongoingExecution", newItem, index);

/** Remove um objeto em dado index na lista de execucoes em andamento salva localmente */
export const removeOngoingExecution = (index: number) =>
  removeObjectItemV2("@ongoingExecution", index);

/** Remove tecnologia da lista salva localmente a partir de seu índice no array */
export const removeTechnology = (index: number) =>
  removeObjectItem("@technology", index);

export const setPauseTimestampAppState = (timestamp: string | null) =>
  setItem("@pauseTimestampAppState", timestamp);

export const getPauseTimestampAppState = () =>
  getItem("@pauseTimestampAppState");

/**
 * Salva a tecnologia sendo utilizada pelo usuário no app.
 * @param technology ID da tecnologia selecionada.
 * @param permanent `true` se a tecnologia deve ser persistida entre sessões do app;
 * `false` se a mesma deve ser requisitada toda vez que o app é aberto.
 */
export const saveTechnology = async (
  technology: number,
  permanent: boolean
) => {
  if (permanent) {
    await mergeObject("@preferences", { technology });
  } else {
    await mergeObject("@session", { technology });
  }
};

export const saveRole = async (
  role: number,
  name: string,
  permanent: boolean
) => {
  if (permanent) {
    await mergeObject("@preferences", { role, roleName: name });
  } else {
    await mergeObject("@session", { role, roleName: name });
  }
};

/**
 * Lista as atividades disponíveis de acordo com a tecnologia e ocupação armazenadas.
 *
 * Usa os valores retornados por `getSession` e `getPreferences` para obter a
 * lista de atividades da tecnologia selecionada que podem ser executadas pelo
 * profissional selecionado.
 */
export const getActivities = async () => {
  const preferences = await getPreferences();
  const session = await getSession();

  const selected = { ...session, ...preferences };

  const { technologies, roles } = await getData();

  const techActivities =
    technologies // de todas as tecnologias
      ?.find((technology) => technology.id === selected.technology) // encontrar a que foi selecionada pelo usuário
      ?.activities // apenas as atividades nos importam
      .map((activity) => activity.id) ?? []; // obter apenas o ID das atividades

  // de todas as ocupações, encontrar a que foi selecionada pelo usuário, e usar apenas as atividades
  const roleActivities =
    roles?.find((role) => role.id === selected.role)?.activities ?? [];

  // filtrar as atividades considerando apenas as que estão presentes também na tecnologia que foi selecionada
  return roleActivities.filter((activity) =>
    techActivities.some((id) => id === activity.id)
  );
};
