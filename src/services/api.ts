import env from '../helpers/env'
import axios from 'axios'

const API_URL = env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export default api
