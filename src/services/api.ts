import { Axios } from 'axios'
import env from '../helpers/env'

const API_URL =
  env.VITE_API_URL[env.VITE_API_URL.length - 1] === '/'
    ? env.VITE_API_URL.slice(0, -1)
    : env.VITE_API_URL

const api = new Axios({
  baseURL: API_URL
})

export default api
