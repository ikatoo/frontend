import { SkillsPageProps } from '../../types/SkillsPage'
import api from '../api'

export default {
  create: async (pageData: Partial<SkillsPageProps>) => {
    const { data, status } = await api.post('skills-page', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (pageData: Partial<SkillsPageProps>) => {
    const { data, status } = await api.patch('skills-page', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  get: async (userId = 1) => {
    try {
      const { data, status } = await api.get<SkillsPageProps>(
        `skills-page/user-id/${userId}`
      )
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
