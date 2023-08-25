import env from 'src/helpers/env'
import { AuthResponseType, SignInProps } from '../../types/Auth'
import api from '../api'

const githubAuth = async (code: string) => {
  const response = await api.post<AuthResponseType>('/auth/github', {
    code
  })
  return response.data
}

const signIn = async ({ username, email, password }: SignInProps) => {
  const { data, status } = await api.post('/auth/sign-in', {
    email,
    username,
    password
  })
  api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
  localStorage.setItem(`${env.VITE_LOCALSTORAGE_PREFIX}token`, data.accessToken)
  localStorage.setItem(
    `${env.VITE_LOCALSTORAGE_PREFIX}user`,
    JSON.stringify(data.user)
  )

  return { data, status }
}

const verifyToken = async () => {
  const token = localStorage.getItem(`${env.VITE_LOCALSTORAGE_PREFIX}token`)
  api.defaults.headers.Authorization = `Bearer ${token}`
  const { data, status } = await api.post('/auth/verify-token')

  return { data, status }
}

const signOut = async () => {
  // await api.post('/auth/signout')
  return
}

export default {
  githubAuth,
  signIn,
  signOut,
  verifyToken
}
