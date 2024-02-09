import { http, HttpResponse } from 'msw'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'
import env from 'src/helpers/env'

export default [
  http.get(`${env.VITE_API_URL}/about`, () => {
    return HttpResponse.json(aboutPageMock)
  }),
  http.post(`${env.VITE_API_URL}/about`, () => {
    return new HttpResponse(null, { status: 201 })
  }),
  http.patch(`${env.VITE_API_URL}/about`, () => {
    return new HttpResponse(null, { status: 204 })
  }),
  http.delete(`${env.VITE_API_URL}/about`, () => {
    return new HttpResponse(null, { status: 204 })
  })
]
