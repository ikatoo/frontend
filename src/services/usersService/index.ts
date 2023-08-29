import { UserSignUp } from 'src/types/User'
import api from '../api'

const create = async (user: UserSignUp) => {
  const response = await api.post('/user', { user })
  return response
}

export default {
  create
}
