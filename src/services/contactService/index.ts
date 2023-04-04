import { ContactPageProps } from '../../types/ContactPage'
import api from '../api'

export default {
  create: async (pageData: Partial<ContactPageProps>) => {
    const { data, status } = await api.post('contact', {
      data: pageData,
      headers: {
        Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
        ContentType: 'application/json'
      }
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (pageData: Partial<ContactPageProps>) => {
    const { data, status } = await api.patch('contact', {
      data: pageData,
      headers: {
        Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
        ContentType: 'application/json'
      }
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  get: async () => {
    try {
      const { data, status } = await api.get<ContactPageProps>('contact', {
        headers: {
          Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
          ContentType: 'application/json'
        }
      })
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  delete: async () => {
    try {
      const { data, status } = await api.delete('contact', {
        headers: {
          Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
          ContentType: 'application/json'
        }
      })
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }
}
