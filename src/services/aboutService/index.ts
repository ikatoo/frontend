import { AboutPageServiceProps } from '../../types/AboutPage'
import api from '../api'

export default {
  create: async (pageData: Partial<AboutPageServiceProps>) => {
    const token = localStorage.getItem('IKATOO_AuthToken') ?? ''
    const { data, status } = await api.post('/about', {
      data: pageData,
      headers: {
        Authorization: `bearer ${token}`,
        ContentType: 'application/json'
      }
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (pageData: Partial<AboutPageServiceProps>) => {
    const token = localStorage.getItem('IKATOO_AuthToken') ?? ''
    const { data, status } = await api.patch('/about', {
      data: pageData,
      headers: {
        Authorization: `bearer ${token}`,
        ContentType: 'application/json'
      }
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  get: async () => {
    const token = localStorage.getItem('IKATOO_AuthToken') ?? ''
    try {
      const { data, status } = await api.get<AboutPageServiceProps>('about', {
        headers: {
          Authorization: `bearer ${token}`,
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
