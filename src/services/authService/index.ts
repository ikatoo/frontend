import { isAxiosError } from 'axios'
import { HttpResponse } from 'src/types/HttpResponse'
import { AuthResponseType, SignInProps } from '../../types/Auth'
import api from '../api'

type SignInFunction = (credentials: SignInProps) => Promise<HttpResponse>

async function githubAuth(code: string): Promise<HttpResponse> {
  const response = await api.post<AuthResponseType>('/auth/github', {
    code
  })
  const { data, status } = response

  return { data, status }
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

async function verifyToken(token: string): Promise<HttpResponse> {
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
    return {
      error: { message: 'Unknow Error' },
      status: 500
    }
  }
}

const signOut = async () => {
  try {
    const { data, status } = await api.post('/auth/sign-out')
    api.defaults.headers.Authorization = ''

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

export default {
  githubAuth,
  signIn,
  signOut,
  verifyToken
}
