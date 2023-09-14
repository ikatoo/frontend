import { AxiosProgressEvent } from 'axios'
import api from '../api'

const get = async (id: string) => {
  try {
    const { data, status } = await api.get('image', {
      data: { id }
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

const upload = async (
  image: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData()
  formData.append('file', image)

  try {
    const { data, status } = await api.post('image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

const destroy = async (id: string) => {
  try {
    const { data, status } = await api.delete('image', {
      data: { id }
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

export default {
  get,
  upload,
  destroy
}
