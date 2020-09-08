
/*
 * Como usar:
 *
 * 1. Instale a dependência `node-fetch`: `npm i [--save-dev] node-fetch`
 * 2. Gere uma API key: https://web.postman.co/settings/me/api-keys
 * 3. Execute os requests "All COllections" e/ou "All Environments" para obter
 *    o `uid` das collections e environments que você deseja exportar:
 *       https://documenter.getpostman.com/view/631643/JsLs/?version=latest
 * 4. Atualize a constante `API_KEY` com o valor gerado
 * 5. No fim do arquivo, adicione uma chamada para cada collection/environment
 *    que você deseja exportar:
 *    - `exportCollection("collection-uid")`
 *    - `exportEnvironment("environment-uid")`
 */

const fetch = require("node-fetch")
const fs = require("fs")

// API key de uma conta com acesso às collections e environments que devem ser exportados
const API_KEY = "PMAK-5e8418cf6e842b0038276d2f-ed1f5c09b82ac473b5c7c27324d3043675"

// diretório onde as collections e environments devem ser persistidos
const outDir = process.argv.length > 2 ? process.argv[2] : "./"

/**
 * Salva um objeto em um arquivo local.
 * @param {any} contents Objeto a ser salvo.
 * @param {string} path Caminho onde salvar o objeto; será salvo a partir do argumento `outDir` passado ao script.
 */
const save = (contents, path) => {
  fs.writeFileSync(outDir + path, JSON.stringify(contents, null, 2))
}

/**
 * Busca uma entidade do Postman a partir do seu UID.
 * @param {string} apiKey API key de uma conta do Postman com acesso à entidade.
 * @param {string} entityName Nome da entidade: `collection` ou `environment`.
 * @param {string} entityID UID da entidade.
 * @returns {Promise<[string: any]>} Uma promise com o JSON da entidade retornado (de acordo com a especificação da API do Postman).
 */
const getPostmanEntity = (apiKey, entityName, entityID) => {
  const url = `https://api.getpostman.com/${entityName}s/${entityID}`
  const headers = { "X-Api-Key": apiKey }

  return fetch(url, { headers })
    .then(response => response.json())
}

/**
 * Exporta uma coleção do Postman para um arquivo local, com base em seu UID.
 * @param {string} collectionID UID da coleção desejada.
 */
const exportCollection = collectionID => {
  getPostmanEntity(API_KEY, "collection", collectionID)
    .then(result => {
      save(result.collection, `${result.collection.info.name}.postman_collection.json`)
    })
}

/**
 * Exporta um ambiente do Postman para um arquivo local, com base em seu UID.
 * @param {string} environmentID UID do ambiente desejado.
 */
const exportEnvironment = environmentID => {
  getPostmanEntity(API_KEY, "environment", environmentID)
    .then(result => {
      save(result.environment, `${result.environment.name}.postman_environment.json`)
    })
}

exportCollection("10919351-173ef936-fc8e-4636-91c7-04926cba0ba5") // dTool API
exportEnvironment("10919351-5b898140-c423-439f-a956-b0f7d87efc97") // DT-local
