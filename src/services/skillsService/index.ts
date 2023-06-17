import { SkillsPageProps } from '../../types/SkillsPage'
import api from '../api'

export default {
  create: async (pageData: Partial<SkillsPageProps>) => {
    const { data, status } = await api.post('skills', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (pageData: Partial<SkillsPageProps>) => {
    const { data, status } = await api.patch('skills', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  get: async () => {
    try {
      const { data, status } = await api.get<SkillsPageProps>('skills')
      const json: SkillsPageProps =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  delete: async () => {
    try {
      const { data, status } = await api.delete('skills')
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }
}
