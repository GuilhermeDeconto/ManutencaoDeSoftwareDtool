/* eslint-disable prettier/prettier */
import { AsyncStorage } from "react-native";
import { Card, FinishedExecution, OngoingExecution, Patient } from "./types";

/**
 * Funções que facilitam e padronizam o acesso ao AsyncStorage por outras partes da aplicação.
 *
 * Principais funções:
 * - `getObject` e `getArray`: `get`s tipados
 * - `mergeObject`: atualização (parcial) de propriedades de objetos
 * - `setObject`: `set` de objetos JavaScript (`object` e `any[]`)
 * - `removeItem`: remover uma chave
 * - `clear`: limpar armazenamento local (dados armazenados pelo app)
 */

/**
 * Lê um objeto que está armazenado localmente (suporta tipagem do objeto retornado).
 * @param key Chave onde o objeto está armazenado.
 */
export async function getObject<T>(key: string): Promise<T> {
  const value = await getItem(key);
  return JSON.parse(value ?? "{}");
}

/**
 * Lê um array de objetos que está armazenado localmente (suporta tipagem nos objetos do array).
 * @param key Chave onde o array está armazenado.
 */
export async function getArray<T>(key: string): Promise<T[]> {
  const value = await getItem(key);
  return JSON.parse(value ?? "[]");
}

/**
 * Armazena um objeto (JSON) localmente (usando `JSON.stringify`).
 * @param key Chave onde o objeto deve ser armazenado.
 * @param value Objeto (JSON) a ser armazenado.
 */
export const setObject = async (key: string, value: any) => {
  await setItem(key, JSON.stringify(value));
};

/**
 * Atualiza apenas algumas propriedades de um objeto armazenado.
 * @param key Chave do objeto que deve ser atualizado.
 * @param update Objeto com propriedades a serem atualizadas no objeto armazenado.
 */
export const mergeObject = async (key: string, update: object) => {
  const current: object = await getObject(key);
  await setObject(key, { ...current, ...update });
};

/**
 * Verifica se o array da chave informada contém objeto de determinado id.
 * @param key Chave do array armazenado no AsyncStorage.
 * @param id Identificador do objeto contido no array.
 */
export const ifIdExists = async (key: string, id: string) => {
  let listItem: string[];
  let list: string | string[] | null = await getItem(key);
  if (list) list = JSON.parse(list ?? "");

  if (Array.isArray(list) && list.length) {
    listItem = list.filter((item: any) => item?.id === id && item);
    return listItem[0];
  }
  return null;
};

/**
 * Adiciona novo objeto no array de objetos informado
 * @param key Chave do array salvo no AsyncStorage
 * @param newItem Objeto a ser adicionado, neste caso Patient
 */
export const addPatientItem = async (key: string, newItem: Patient) => {
  let list: string | any[] | null = await getItem(key);

  if (list) list = JSON.parse(list ?? "");
  if (!Array.isArray(list) || !list?.length) list = [];
  else if (await ifIdExists(key, newItem.id)) {
    console.log("⚠️  ID already exists: ", await getItem(key));
    return false;
  }
  let array = list as Patient[];
  array.push(newItem);
  array = array.sort((a, b) => a.name.localeCompare(b.name));
  await setItem(key, JSON.stringify(array));

  return true;
};

/**
 * Adiciona novo Card no inicio do array de Cards
 * @param key Chave do array salvo no AsyncStorage
 * @param newItem Card a ser adicionado
 */
export const addCardItem = async (key: string, newItem: Card) => {
  let list: string | string[] | null = await getItem(key);

  if (list) list = JSON.parse(list ?? "");
  if (!Array.isArray(list) || !list?.length) list = [];

  list.unshift(newItem);
  await setItem(key, JSON.stringify(list));

  return true;
};

/**
 * Adiciona novo objeto no final do array de objetos informado
 * @param key Chave do array salvo no AsyncStorage
 * @param newItem Objeto a ser adicionado
 */
export const addObjectItem = async (
  key: string,
  newItem: OngoingExecution | FinishedExecution
) => {
  let list: string | string[] | null = await getItem(key);

  if (list) list = JSON.parse(list ?? "");
  if (!Array.isArray(list) || !list?.length) list = [];

  list.unshift(newItem);
  await setItem(key, JSON.stringify(list));

  return true;
};

/**
 * Altera objeto em dado index da lista indicada para o objeto determinado
 * @param key Chave do array salvo no AsyncStorage
 * @param newItem O novo objeto para aquele indice
 * @param index O indice na lista onde o objeto deve ser alterado
 */
export const setObjectItem = async (
  key: string,
  newItem: OngoingExecution | Card,
  index: number
) => {
  let list: string | string[] | null = await getItem(key);

  if (list) list = JSON.parse(list ?? "");
  if (!Array.isArray(list) || !list?.length) list = [];

  list[index] = newItem;
  await setItem(key, JSON.stringify(list));

  return true;
};

/**
 * Remove objeto do array de objetos informado no indice indicado
 * @param key Chave do array salvo no AsyncStorage
 * @param index Índice do objeto no array
 * @returns o array após a remoção
 */
export const removeObjectItem = async (key: string, index: number) => {
  let list: string | string[] | null = await getItem(key);
  if (list) list = JSON.parse(list ?? "");

  if (Array.isArray(list) && list.length > 0) list.splice(index, 1);
  else console.log(`❌Error removing ${key}[${index}] from AsyncStorage`);

  await setItem(key, JSON.stringify(list));
  const currentList = await getItem(key);
  console.log(`✅ ${key}: ${currentList}`);

  return currentList;
};

/**
 * Remove objeto do array de objetos informado no indice indicado
 * @param key Chave do array salvo no AsyncStorage
 * @param index Índice do objeto no array
 * @returns o item removido da lista
 */
export const removeObjectItemV2 = async (key: string, index: number) => {
  let list: string | string[] | null = await getItem(key);
  let removed;
  if (list) list = JSON.parse(list ?? "");

  if (Array.isArray(list) && list.length > 0) {
    removed = list[index];
    list.splice(index, 1);
  } else {
    console.log(`❌Error removing ${key}[${index}] from AsyncStorage`);
    return null;
  }

  await setItem(key, JSON.stringify(list));
  return removed;
};

/** Limpa todos os dados armazenados pela aplicação (chaves que começam com `"@"`). */
export const clear = async () => {
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys.filter((key) => key.startsWith("@")));
};

/**
 * Retorna valor de item do armazenamento local com a chave informada
 * @param key Chave salva no AsyncStorage
 */
export const getItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`❌ Error retrieving ${key} from AsyncStorage`, error);
    return "";
  }
};

/**
 * Remove item do armazenamento local com a chave informada
 * @param key Chave salva no AsyncStorage
 */
export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`❌Error removing ${key} from AsyncStorage`);
  }
};

/**
 * Define ou atualiza valor de determinada chave salva no armazenamento local
 * @param key Chave salva no armazenamento local
 * @param item Valor da chave que deseja armazenar
 */
export const setItem = async (key: string, item: string) => {
  try {
    await AsyncStorage.setItem(key, item);
    console.log(`✅ ${key} - saved: ${item}`);
  } catch (error) {
    console.log(`❌ Error saving ${key}`, error);
  }
};
