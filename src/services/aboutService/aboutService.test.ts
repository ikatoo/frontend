import { describe, test } from 'vitest'

import aboutService from '.'
import { aboutPageMock } from '../../mocks/aboutPageMock'

describe('About page fetch data', () => {
  test('should get about page data', async () => {
    const result = await aboutService.get()

    expect(result).toEqual(aboutPageMock)
  })
})
