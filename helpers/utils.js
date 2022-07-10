/**
 * Permite poner en espera en funcion de los microsegundos
 * @param ms
 * @returns {Promise<unknown>}
 * @constructor
 */
const SLEEP = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export {
  SLEEP
}
