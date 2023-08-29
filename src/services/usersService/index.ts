import { Email } from 'src/types/Email'
import { UserSignUp } from 'src/types/User'
import api from '../api'

const create = async (user: UserSignUp) => {
  const response = await api.post('/user', { user })
  return response
}

const recoveryPassword = async (email: Email) => {
  const response = await api.post('/user/password-recovery', { email })
  return response
}

export default {
  create,
  recoveryPassword
}
