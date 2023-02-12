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
  create: async ({
    title,
    description
  }: Omit<Partial<AboutPageServiceType>, 'id'>) => {
    await api.post(
      '/about',
      {
        title,
        description
      },
      getHeaders()
    )
  },
  update: async ({ title, description }: Partial<AboutPageServiceType>) => {
    await api.put(
      '/about',
      {
        title,
        description
      },
      getHeaders()
    )
  },
  get: async () => {
    const { data } = await api.get<AboutPageServiceType>('/about')

    return data
  },
  delete: async () => {
    await api.delete('/about')
  }
}
