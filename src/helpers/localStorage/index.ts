import env from '../env'

type LocalStorageKeys = 'token'

const getLocalStorage = (key: LocalStorageKeys) =>
  localStorage.getItem(`${env.VITE_LOCALSTORAGE_PREFIX}${key}`)

const setLocalStorage = (key: LocalStorageKeys, value: string) =>
  localStorage.setItem(`${env.VITE_LOCALSTORAGE_PREFIX}${key}`, value)

const removeLocalStorage = (key: LocalStorageKeys) =>
  localStorage.removeItem(`${env.VITE_LOCALSTORAGE_PREFIX}${key}`)

export { getLocalStorage, setLocalStorage, removeLocalStorage }
