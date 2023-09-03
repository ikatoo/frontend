import { Email } from 'src/types/Email'
import { UserSignUp } from 'src/types/User'
import api from '../api'
import { HttpResponseSchema } from 'src/types/HttpResponse'

const create = async (user: UserSignUp) => {
  try {
    const response = await api.post('/user', { user })
    return response
  } catch (error) {
    const validResponse = HttpResponseSchema.safeParse(error)

    if (!validResponse.success) {
      const { issues } = validResponse.error
      return { data: issues[0], status: 500 }
    }
    return { data: validResponse.data.data, status: validResponse.data.status }
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
