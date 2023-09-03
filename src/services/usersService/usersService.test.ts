vi.mock('../api')

import { describe, expect, test, vi } from 'vitest'

import { AxiosResponse } from 'axios'
import usersService from '.'
import api from '../api'

describe('should receive token when create user with success', () => {
  test('should receive 201 statusCode when sign-in with success', async () => {
    const mock = {
      user: {
        id: '7',
        name: 'zé da silva',
        email: 'ze@dasilva.com'
      },
      accessToken: 'valid-access-token'
    }
    api.post = vi.fn().mockResolvedValue({
      status: 201,
      data: { accessToken: mock.accessToken }
    })
    const { data, status } = (await usersService.create({
      name: mock.user.name,
      email: mock.user.email,
      password: 'somepass'
    })) as AxiosResponse

    expect(status).toEqual(201)
    expect(data).toEqual({ accessToken: mock.accessToken })
  })
})
