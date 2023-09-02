import env from '../env'

const getLocalStorage = (key: string) =>
  localStorage.getItem(`${env.VITE_LOCALSTORAGE_PREFIX}${key}`)

const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(`${env.VITE_LOCALSTORAGE_PREFIX}${key}`, value)

export { getLocalStorage, setLocalStorage }
