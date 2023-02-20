import { AboutPageServiceType } from '../../types/AboutPage'
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
  create: async (aboutPageData: AboutPageServiceType) => {
    await api.post('/about', aboutPageData, getHeaders())
  },
  update: async (aboutPageData: Partial<AboutPageServiceType>) => {
    await api.put('/about', aboutPageData, getHeaders())
  },
  get: async () => {
    const { data } = await api.get<AboutPageServiceType>('/about')

    return data
  },
  delete: async () => {
    await api.delete('/about')
  }
}
