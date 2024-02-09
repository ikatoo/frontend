import { http, HttpResponse } from 'msw'
import contactPageMock from 'shared/mocks/contactPageMock/result.json'
import env from 'src/helpers/env'

export default [
  http.get(`${env.VITE_API_URL}/contact`, () => {
    return HttpResponse.json(contactPageMock)
  }),
  http.post(`${env.VITE_API_URL}/contact`, () => {
    return new HttpResponse(null, { status: 201 })
  }),
  http.patch(`${env.VITE_API_URL}/contact`, () => {
    return new HttpResponse(null, { status: 204 })
  }),
  http.delete(`${env.VITE_API_URL}/contact`, () => {
    return new HttpResponse(null, { status: 204 })
  })
]
