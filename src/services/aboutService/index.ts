import { AboutPageServiceProps } from '../../types/AboutPage'
import api from '../api'

export default {
  create: async (pageData: Partial<AboutPageServiceProps>) => {
    const { data, status } = await api.post('/about-page', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (pageData: Partial<AboutPageServiceProps>) => {
    const { data, status } = await api.patch('/about', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  get: async (userId = 1) => {
    try {
      const { data, status } = await api.get<AboutPageServiceProps>(
        `about-page/user-id/${userId}`
      )
      const json: AboutPageServiceProps =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  delete: async () => {
    try {
      const { data, status } = await api.delete('about-page')
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }
}
