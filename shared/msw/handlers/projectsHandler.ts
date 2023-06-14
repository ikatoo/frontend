import { rest } from 'msw'
import projectsMock from 'shared/mocks/projectsMock/result.json'
import env from 'src/helpers/env'

export default [
  rest.get(`${env.VITE_API_URL}/projects`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projectsMock))
  }),
  rest.get(`${env.VITE_API_URL}/projects/title/:title`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projectsMock))
  }),
  rest.get(`${env.VITE_API_URL}/project/id/:id`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projectsMock[1]))
  }),
  rest.post(`${env.VITE_API_URL}/project`, (_req, res, ctx) => {
    return res(ctx.status(201))
  }),
  rest.patch(`${env.VITE_API_URL}/project/id/:id`, (_req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.delete(`${env.VITE_API_URL}/project/id/:id`, (_req, res, ctx) => {
    return res(ctx.status(204))
  })
]
