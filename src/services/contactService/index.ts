import { ContactPageProps } from '../../types/ContactPage'
import api from '../api'

type Email = {
  from: string
  message: string
}

export default {
  create: async (pageData: ContactPageProps & { userId: number }) => {
    const { data, status } = await api.post('contact-page', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (pageData: Partial<ContactPageProps>) => {
    const { data, status } = await api.patch('contact-page', pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  get: async (userId = 1) => {
    try {
      const { data, status } = await api.get<ContactPageProps>(
        `contact-page/user-id/${userId}`
      )
      const json: ContactPageProps =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  delete: async () => {
    try {
      const { data, status } = await api.delete('contact-page')
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  },
  sendEmail: async (email: Email) => {
    const { data, status } = await api.post('mailer', {
      from: email.from,
      to: 'mckatoo@gmail.com',
      subject: 'iKatoo - Contact',
      message: email.message
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  }
}
