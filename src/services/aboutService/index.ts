import { about } from '../../pages/About/mock'
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

const serviceErrorMessage = (error: Error) => {
  console.log('----------------')
  console.log('Service error:', error)
  console.log('----------------')
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
    try {
      // const { data } = await api.get<AboutPageServiceType>(
      //   `/about`,
      //   {
      //     headers: { 'Content-Type': 'application/json' }
      //   }
      // )

      return about
    } catch (error) {
      error instanceof Error && serviceErrorMessage(error)
    }
  }
}
