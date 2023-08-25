import { describe, expect, test, vi } from 'vitest'

import api from '../api'
import authService from '.'
import { AuthResponseType } from 'src/types/Auth'
import { AxiosResponse } from 'axios'

describe('should receive token when authenticate with success', () => {
  test('should get accessToken when sign-in with success', async () => {
    const mock = {
      user: {
        id: '7',
        name: 'zé da silva',
        email: 'ze@dasilva.com'
      },
      accessToken: 'valid-access-token'
    }
    api.post = vi.fn().mockResolvedValue({ data: mock, status: 200 })
    const result = (await authService.signIn({
      email: mock.user.email,
      password: 'somepass'
    })) as AxiosResponse<AuthResponseType>

    expect(result.data).toEqual(mock)
    expect(result.status).toEqual(200)
  })

  // test('should get contact page data', async () => {
  //   const mock = {
  //     user: {
  //       id: '7',
  //       username: 'zedasilva',
  //       name: 'zé da silva',
  //       email: 'ze@dasilva.com',
  //       avatar: {
  //         url: 'https://avatar.url.com/image.jpg',
  //         alt: 'avator of the user'
  //       }
  //     },
  //     accessToken: 'valid-access-token',
  //     refreshToken: 'valid-refresh-token'
  //   }
  //   api.post = vi.fn().mockResolvedValue({ data: mock, status: 200 })
  //   const result = (await authService.signIn({
  //     email: mock.user.email,
  //     password: 'somepass'
  //   })) as AxiosResponse<AuthResponseType>

  //   expect(result.data).toEqual(mock)
  //   expect(result.status).toEqual(200)
  // })
})
