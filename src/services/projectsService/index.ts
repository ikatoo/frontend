import { ProjectProps } from '../../pages/Projects'
import api from '../api'

export default {
  create: async (pageData: Partial<ProjectProps>) => {
    const result = await api.post('project', pageData)
    const { data, status } = result
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (id: number, pageData: Partial<ProjectProps>) => {
    const { data, status } = await api.patch(`project/id/${id}`, pageData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  delete: async (id: number) => {
    const { data, status } = await api.delete(`project/id/${id}`)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
    // try {
    // } catch (error) {
    //   if (error instanceof Error) throw error
    // }
  },
  get: async () => {
    const { data, status } = await api.get<ProjectProps[]>('projects')
    const json: ProjectProps[] =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
    // try {
    // } catch (error) {
    //   if (error instanceof Error) throw error
    // }
  },
  getByID: async (id: number) => {
    const { data, status } = await api.get<ProjectProps>(`project/id/${id}`)
    const json: ProjectProps =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
    // try {
    // } catch (error) {
    //   if (error instanceof Error) throw error
    // }
  },
  getByTitle: async (title: string) => {
    const { data, status } = await api.get<ProjectProps[]>(
      `projects/title/${title}`
    )
    const json: ProjectProps[] =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
    // try {
    // } catch (error) {
    //   if (error instanceof Error) throw error
    // }
  }
}
