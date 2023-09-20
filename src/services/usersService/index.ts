import { Email } from 'src/types/Email'
import { HttpResponseSchema } from 'src/types/HttpResponse'
import { UserSignUp } from 'src/types/User'
import api from '../api'

const create = async (user: UserSignUp) => {
  try {
    const { data, status } = await api.post('/user', user)
    api.defaults.headers.Authorization = `Bearer ${data.accessToken}`

    return { data, status }
  } catch (error) {
    const validResponse = HttpResponseSchema.safeParse(error)

    if (!validResponse.success) {
      const { issues } = validResponse.error
      return { data: issues[0], status: 500 }
    }

    const { data, status } = validResponse.data
    return { data, status }
  }
}

const recoveryPassword = async (email: Email) => {
  try {
    const response = await api.post('/user/password-recovery', { email })
    return response
  } catch (error) {
    const validResponse = HttpResponseSchema.safeParse(error)
    const status = !!error && typeof error === 'object' && 'response' in error

    if (!validResponse.success)
      return { data: validResponse.error.issues[0], status }
  }
}

export default {
  create,
  recoveryPassword
}
