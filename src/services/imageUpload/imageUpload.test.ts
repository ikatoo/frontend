import { expect } from 'vitest'
import { upload } from '.'

describe('image upload service', () => {
  test('upload image and return url', () => {
    const image = 'teste.jpg'
    const file = new File(['file'], 'teste.jpg', { type: 'image/jpg' })
    const result = upload(file)

    expect(result).toEqual(image)
  })
})
