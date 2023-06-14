import { rest } from 'msw'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json'
import env from 'src/helpers/env'

export default [
  rest.get(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
  rest.get(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(skillsPageMock))
  }),
  rest.post(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(201))
  }),
  rest.patch(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.delete(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(204))
  })
]
