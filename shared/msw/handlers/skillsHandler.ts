import { http, HttpResponse } from 'msw'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json'
import env from 'src/helpers/env'

export default [
  http.get(`${env.VITE_API_URL}/skills`, () => {
    return HttpResponse.json({})
  }),
  http.get(`${env.VITE_API_URL}/skills`, () => {
    return HttpResponse.json(skillsPageMock)
  }),
  http.post(`${env.VITE_API_URL}/skills`, () => {
    return new HttpResponse(null, { status: 201 })
  }),
  http.patch(`${env.VITE_API_URL}/skills`, () => {
    return new HttpResponse(null, { status: 204 })
  }),
  http.delete(`${env.VITE_API_URL}/skills`, () => {
    return new HttpResponse(null, { status: 204 })
  })
]
