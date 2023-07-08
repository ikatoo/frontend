import api from '../api'

const get = async (id: string) => {
  try {
    const { data, status } = await api.get('image', {
      data: {
        publicId: id
      }
    })
    const json =
      typeof data === 'string' && data !== '' ? JSON.parse(data) : data

    return { data: json, status }
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

const upload = async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)

  try {
    const { data, status } = await api.post('image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
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
      data: {
        publicId: id
      }
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
