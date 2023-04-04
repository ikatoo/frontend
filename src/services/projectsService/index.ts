import { ProjectProps } from '../../pages/Projects'
import api from '../api'

export default {
  create: async (pageData: Partial<ProjectProps>) => {
    const { data, status } = await api.post('project', {
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
  patch: async (id: number, pageData: Partial<ProjectProps>) => {
    const { data, status } = await api.patch(`project/id/${id}`, {
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
  delete: async (id: number) => {
    try {
      const { data, status } = await api.delete(`project/id/${id}`, {
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
  },
  get: async () => {
    try {
      const { data, status } = await api.get<ProjectProps[]>('projects', {
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
  },
  getByID: async (id: number) => {
    try {
      const { data, status } = await api.get<ProjectProps>(`project/id/${id}`, {
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
  },
  getByTitle: async (title: string) => {
    try {
      const { data, status } = await api.get<ProjectProps[]>(
        `projects/title/${title}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
            ContentType: 'application/json'
          }
        }
      )
      const json =
        typeof data === 'string' && data !== '' ? JSON.parse(data) : data

      return { data: json, status }
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }
}
