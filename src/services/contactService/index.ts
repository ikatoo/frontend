import { ContactPageProps } from '../../types/ContactPage'
import api from '../api'

export default {
  create: async (pageData: ContactPageProps) => {
    const { data, status } = await api.post('contact', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (pageData: Partial<ContactPageProps>) => {
    const { data, status } = await api.patch('contact', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  get: async () => {
    try {
      const { data, status } = await api.get<ContactPageProps>('contact')
      const json: ContactPageProps =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  delete: async () => {
    try {
      const { data, status } = await api.delete('contact')
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }
}
