import { SkillsPageServiceType } from '../../types/SkillsPageServiceType'
import api from '../api'

export default {
  create: async (pageData: Partial<SkillsPageServiceType>) => {
    const token = localStorage.getItem('IKATOO_AuthToken') ?? ''
    const { data, status } = await api.post('skill', {
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
  patch: async (pageData: Partial<SkillsPageServiceType>) => {
    const token = localStorage.getItem('IKATOO_AuthToken') ?? ''
    const { data, status } = await api.patch('skill', {
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
      const { data, status } = await api.get<SkillsPageServiceType>('skill', {
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