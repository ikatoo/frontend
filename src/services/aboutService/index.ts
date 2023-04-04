import { AboutPageServiceProps } from '../../types/AboutPage'
import api from '../api'

export default {
  create: async (pageData: Partial<AboutPageServiceProps>) => {
    const { data, status } = await api.post('/about', {
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
  patch: async (pageData: Partial<AboutPageServiceProps>) => {
    const { data, status } = await api.patch('/about', {
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
      const { data, status } = await api.get<AboutPageServiceProps>('about', {
        headers: {
          Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
          ContentType: 'application/json'
        }
      })
      const json: typeof data =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  delete: async () => {
    try {
      const { data, status } = await api.delete<AboutPageServiceProps>(
        'about',
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
            ContentType: 'application/json'
          }
        }
      )
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }
}
