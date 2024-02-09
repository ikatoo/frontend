import { http, HttpResponse } from 'msw'
import projectsMock from 'shared/mocks/projectsMock/result.json'
import env from 'src/helpers/env'

export default [
  http.get(`${env.VITE_API_URL}/projects`, () => {
    return HttpResponse.json(projectsMock)
  }),
  http.get(`${env.VITE_API_URL}/projects/title/:title`, () => {
    return HttpResponse.json(projectsMock)
  }),
  http.get(`${env.VITE_API_URL}/project/id/:id`, () => {
    return HttpResponse.json(projectsMock[1])
  }),
  http.post(`${env.VITE_API_URL}/project`, () => {
    return new HttpResponse(null, { status: 201 })
  }),
  http.patch(`${env.VITE_API_URL}/project/id/:id`, () => {
    return new HttpResponse(null, { status: 204 })
  }),
  http.delete(`${env.VITE_API_URL}/project/id/:id`, () => {
    return new HttpResponse(null, { status: 204 })
  })
]
