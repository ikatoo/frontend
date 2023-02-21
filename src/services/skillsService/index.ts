import { SkillsPageServiceType } from '../../types/SkillsPage'
import api from '../api'

const getHeaders = () => {
  const token = localStorage.getItem('IKATOO_AuthToken') ?? ''

  return {
    headers: {
      Authorization: `bearer ${token}`,
      ContentType: 'application/json'
    }
  }
}

export default {
  create: async (skillsPageData: SkillsPageServiceType) => {
    await api.post('/skills', skillsPageData, getHeaders())
  },
  update: async (skillsPageData: Partial<SkillsPageServiceType>) => {
    await api.put('/skills', skillsPageData, getHeaders())
  },
  get: async () => {
    const { data } = await api.get<SkillsPageServiceType>('/skills')

    return data
  },
  delete: async () => {
    await api.delete('/skills')
  }
}
