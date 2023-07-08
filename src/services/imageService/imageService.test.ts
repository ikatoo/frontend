import { expect, vi } from 'vitest'
import imageService from '.'
import api from '../api'

describe('image upload service', () => {
  test('upload image and return url', async () => {
    const expected = {
      url: 'https://cloudinary.com/folder/image.png',
      public_id: 'folder/image.png'
    }
    api.post = vi.fn().mockResolvedValue({ data: expected, status: 201 })
    const image = new File(['image'], 'image.jpg', {
      type: 'image/jpg'
    })
    const result = await imageService.upload(image)

    expect(result?.status).toEqual(201)
    expect(result?.data).toEqual(expected)
  })

  test('get url of the image using a publicId', async () => {
    const publicId = 'folder/image.jpg'
    const expected = { url: `https://url.com/${publicId}` }
    api.get = vi.fn().mockResolvedValue({ data: expected, status: 200 })

    const result = await imageService.get(publicId)

    expect(result?.status).toEqual(200)
    expect(result?.data).toEqual(expected)
  })

  test('delete image using a publicId without error', async () => {
    const publicId = 'folder/image.jpg'
    api.delete = vi.fn().mockResolvedValue({ status: 204 })

    const result = await imageService.destroy(publicId)

    expect(result?.status).toEqual(204)
  })
})
