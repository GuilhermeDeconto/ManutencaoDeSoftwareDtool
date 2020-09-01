import { getUniqueId } from "react-native-device-info";
import { PermissionsAndroid, YellowBox } from "react-native";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import moment from "moment";
import {
  clear,
  getPreferences,
  getAuth,
  setAccessCode,
  saveData,
  getCards,
  getFinishedExecutions,
  resetFinishedExecutions,
} from "./localStorage";
import api from "./API";
import { Permission, Reports } from "./types";

YellowBox.ignoreWarnings(["Require cycle"]);

/**
 * Coordena operações complexas da aplicação (principalmente aquelas relacionadas
 * ao fluxo online/offline), de forma a simplificar a implementação das telas do app.
 *
 * Índice de funções:
 * - `startupScreen`: atualiza os dados locais (se possível) e retorna qual deve ser a tela inicial do app
 * - `processAccessCode`: valida um código de acesso e armazena as informações retornadas.
 */

/**
 * Possíveis telas iniciais do app:
 * - `home`: tela de início;
 * - `readCode`: tela para informar código de acesso;
 * - `technology`: tela para selecionar tecnologia.
 * - `CarouselScreen`: tela de execuções de atividades.
 */
type Screen = "home" | "readCode" | "technology" | "execution";

/**
 * Faz as verificações necessárias ao iniciar o app e retorna um código
 * representando a primeira tela a ser exibida quando o app é aberto.
 *
 * Se houver um código de acesso salvo, tenta atualizar os dados locais; se não
 * houver conexão, continua usando os dados que estão presentes localmente.
 *
 * @returns Um código que representa a tela a ser exibida (ver `Screen`).
 */
export const startupScreen = async (): Promise<Screen> => {
  const { code } = await getAuth();

  // se não tiver código de acesso salvo, redirecionar para leitura de código
  if (code === null || code === undefined) {
    return "readCode";
  }

  // se tiver código de acesso, tentar atualizar informações locais
  try {
    const result = await api.post("/auth", { code });

    // se o request foi feito com sucesso, atualizar dados locais
    await saveData(result.data);

    // verificar permissão e direcionar ao fluxo correspondente
    return firstScreenAfterAppStartup();
  } catch (error) {
    // se for 404, então a instituição foi deletada
    if (error.result?.status === 404) {
      // limpar dados locais e continuar com leitura de código
      await clear();
      return "readCode";
    }

    // se for um erro de conexão, usar dados locais
    return firstScreenAfterAppStartup();
  }
};

/**
 * Computa a primeira tela a ser exibida quando o app é aberto.
 *
 * Verifica a permissão do código de acesso usado para entrar no app, assim como
 * as preferências salvas localmente (como se há uma tecnologia persistida).
 */
const firstScreenAfterAppStartup = async (): Promise<Screen> => {
  const { permission } = await getAuth();
  if (
    permission === "administration-app" ||
    permission === "administration-hospital"
  ) {
    return "home";
  }

  const { technology } = await getPreferences();
  const hasTechnology = technology !== null && technology !== undefined;
  const cards = await getCards();

  if (Array.isArray(cards) && cards.length) return "execution";
  if (hasTechnology) return "home";

  return "technology";
};

/**
 * Verifica a validade de um código de acesso e persiste as informações
 * da instituição relacionada, se for um código válido.
 *
 * @param code Código de acesso à aplicação (quatro caracteres).
 * @returns O nível de permissão do código. Se for um código inválido,
 * lança um erro com a mensagem `'not-found'`; se houver um erro ao validar
 * o código, lança um erro com a mensagem `'network'`.
 */
export const processAccessCode = async (code: string): Promise<Permission> => {
  try {
    const response = await api.post("/auth", { code });

    await setAccessCode(code);
    await saveData(response.data);

    return response.data.permission;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("not-found");
    }

    throw new Error("network");
  }
};

/**
 * Sincroniza a lista local de execuções de atividades com o servidor.
 *
 * Se a sincronização for bem sucedida, as execuções locais são deletadas; se a
 * instituição de saúde não existir mais no sistema, todos os dados locais são
 * deletados (execuções não sincronizadas, execuções em andamento, ...) e um
 * erro com mensagem `"institution-not-found"` é lançado; se algum erro de rede
 * ocorrer, a operação falha com um erro com mensagem `"network"`.
 */
export const syncExecutions = async () => {
  try {
    await uploadExecutions();
    await resetFinishedExecutions();
  } catch (error) {
    if (error.message === "auth") {
      try {
        await authenticate();
      } catch (authError) {
        if (authError.message === "not-found") {
          await clear();
          throw new Error("institution-not-found");
        }

        // other errors should be handled by callers (network); rethrow
        throw authError;
      }

      await syncExecutions();
    }

    // other errors should be handled by callers (network); rethrow
    throw error;
  }
};

/**
 * Faz o upload de uma lista local de execuções para a API.
 *
 * Erros lançados:
 * - `auth`: token inválido;
 * - `network`: erro de rede.
 */
const uploadExecutions = async (): Promise<void> => {
  const executions = (await getFinishedExecutions()).map((execution) => {
    return {
      activityId: execution.activity,
      roleId: execution.role,
      timestamp: moment(execution.date).toISOString(true),
      endDate: moment(execution.endDate).toISOString(true),
      duration: execution.duration,
    };
  });

  if (executions.length === 0) {
    return;
  }

  try {
    const token = getUniqueId();

    await api.post("/executions", {
      deviceToken: token,
      executions,
    });
  } catch (error) {
    // invalid token
    if (error.response?.status === 401) {
      throw new Error("auth");
    }

    // network error
    throw new Error("network");
  }
};

/**
 * Faz o download do arquivo Excel da tecnologia atual para o celular.
 *
 * Erros lançados:
 * - `techID`: ID inválido;
 * - `network`: erro de rede.
 */
export const downloadReport = async (): Promise<void> => {
  try {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
  } catch (err) {
    console.warn(err);
  }

  await authenticate();

  try {
    const { code, token } = await getAuth();
    const url = `${api.defaults.baseURL}/reports/complete`;
    const filename = `Relatório dTool - ${code}.xlsx`;
    const localFile = `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}`;

    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true, // required
        notification: true,
        path: `file://${localFile}`,
        mime:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        description: "Relatório DTool.",
      },
    })
      .fetch("GET", url, {
        Authorization: `Bearer ${token}`,
      })
      .then((res) => {
        // when response status code is 200
        console.log("The file saved to ", res.path());
      })
      .catch((_errorMessage) => {
        console.log(_errorMessage);
      });
  } catch (error) {
    // invalid ID
    if (error.response?.status === 400) {
      throw new Error("techID");
    }

    // network error
    throw new Error("network");
  }
};

/**
 * Faz a autenticação usando o código de acesso salvo local, atualizando os
 * dados locais.
 *
 * Erros lançados:
 * - `not-found`: instituição não encontrada (não existe ou deletada);
 * - `network`: erro de rede.
 */
const authenticate = async () => {
  const { code } = await getAuth();

  try {
    const result = await api.post("/auth", { code });
    axios.defaults.headers.common.Authorization = `Bearer ${result.data.accessToken}`;
    api.defaults.headers.common.Authorization = `Bearer ${result.data.accessToken}`;
    await saveData(result.data);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("not-found");
    }

    throw new Error("network");
  }
};

/*
 * Faz a requisição ao backend pelos dados para popular os gráficos da tela de Relatórios do App
 */
export const getReports = async (
  technology: number,
  role: number
): Promise<Reports[]> => {
  await authenticate();

  try {
    const result = await api.get("/reports/simple", {
      params: { technology, role },
    });
    return result.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [] as Reports[];
    }
    // other errors should be handled by callers; rethrow
    throw error;
  }
};
