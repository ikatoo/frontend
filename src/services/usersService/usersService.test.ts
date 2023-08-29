vi.mock('../api')

import { describe, expect, test, vi } from 'vitest'

import { AxiosResponse } from 'axios'
import usersService from '.'
import api from '../api'

describe('should receive token when create user with success', () => {
  test('should receibe 201 statusCode when sign-in with success', async () => {
    const mock = {
      user: {
        id: '7',
        name: 'zé da silva',
        email: 'ze@dasilva.com'
      },
      accessToken: 'valid-access-token'
    }
    api.post = vi.fn().mockResolvedValue({ status: 201 })
    const result = (await usersService.create({
      name: mock.user.name,
      email: mock.user.email,
      password: 'somepass'
    })) as AxiosResponse

    expect(result.status).toEqual(201)
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
  //   const result = (await usersService.signIn({
  //     email: mock.user.email,
  //     password: 'somepass'
  //   })) as AxiosResponse<AuthResponseType>

  //   expect(result.data).toEqual(mock)
  //   expect(result.status).toEqual(200)
  // })
})
