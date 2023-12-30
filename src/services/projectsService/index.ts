import api from '../api'

type Skill = { title: string }

export type CreateProject = {
  id?: number
  title: string
  description: string
  snapshot: string
  repositoryLink: string
  start: Date
  lastUpdate: Date
  skills: Skill[]
  userId: number
}

export default {
  create: async (project: CreateProject) => {
    const result = await api.post('project', project)
    const { data, status } = result
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  patch: async (id: number, newData: Partial<CreateProject>) => {
    const { data, status } = await api.patch(`project/id/${id}`, newData)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  delete: async (id: number) => {
    const { data, status } = await api.delete(`project/id/${id}`)
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  getAll: async () => {
    const { data, status } = await api.get<CreateProject[]>('projects')
    const json: CreateProject[] =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  getByUserId: async (userId = 1) => {
    const { data, status } = await api.get<CreateProject[]>(
      `projects/user-id/${userId}`
    )
    const json: CreateProject[] =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  getByID: async (id: number) => {
    const { data, status } = await api.get<CreateProject>(`project/id/${id}`)
    const json: CreateProject =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  },
  getByTitle: async (title: string) => {
    const { data, status } = await api.get<CreateProject[]>(
      `projects/title/${title}`
    )
    const json: CreateProject[] =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  }
}
