import { isAxiosError } from 'axios'
import { HttpResponse } from 'src/types/HttpResponse'
import { AuthResponseType, SignInProps } from '../../types/Auth'
import api from '../api'

type SignInFunction = (credentials: SignInProps) => Promise<HttpResponse>

const githubAuth = async (code: string) => {
  const response = await api.post<AuthResponseType>('/auth/github', {
    code
  })
  return response.data
}

const signIn: SignInFunction = async ({ username, email, password }) => {
  try {
    const { data, status } = await api.post('/auth/sign-in', {
      email,
      username,
      password
    })
    api.defaults.headers.Authorization = `Bearer ${data.accessToken}`

    return { data, status }
  } catch (error) {
    if (isAxiosError(error))
      return {
        error: {
          message: error.message
        },
        status: error.response?.status ?? 500
      }
  }

  return { status: 500 }
}

const verifyToken = async (token: string) => {
  try {
    api.defaults.headers.Authorization = `Bearer ${token}`
    const { data, status } = await api.post('/auth/verify-token')
    return { data, status }
  } catch (error) {
    if (isAxiosError(error))
      return {
        error: {
          message: error.message
        },
        status: error.response?.status ?? 500
      }
  }
}

const signOut = async () => {
  try {
    await api.post('/auth/sign-out')
  } catch (error) {
    console.log(error)
  }
  api.defaults.headers.Authorization = ''

  return
}

export default {
  githubAuth,
  signIn,
  signOut,
  verifyToken
}
