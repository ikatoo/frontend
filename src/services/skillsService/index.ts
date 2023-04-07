import { SkillsPageProps } from '../../types/SkillsPage'
import api from '../api'

export default {
  create: async (pageData: Partial<SkillsPageProps>) => {
    const { data, status } = await api.post('skills', {
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
  patch: async (pageData: Partial<SkillsPageProps>) => {
    const { data, status } = await api.patch('skills', {
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
      const { data, status } = await api.get<SkillsPageProps>('skills', {
        headers: {
          Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
          ContentType: 'application/json'
        }
      })
      const json: SkillsPageProps =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  delete: async () => {
    try {
      const { data, status } = await api.delete('skills', {
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
