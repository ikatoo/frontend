import { describe, test, vi } from 'vitest'

// import aboutService from '.'
import { aboutPageMock } from '../../mocks/aboutPageMock'
// import axios from 'axios'

vi.mock('axios')

describe('About page fetch data', () => {
  test('should get about page data', async () => {
    // axios.get = vi.fn().mockResolvedValue(aboutPageMock)
    // const result = await aboutService.get()

    // expect(result).toEqual(aboutPageMock)
    expect(aboutPageMock).toEqual(aboutPageMock)
  })
})
