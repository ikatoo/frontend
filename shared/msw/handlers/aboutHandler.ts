import { rest } from 'msw'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'
import env from 'src/helpers/env'

export default [
  rest.get(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(aboutPageMock))
  }),
  rest.post(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
    return res(ctx.status(201))
  }),
  rest.patch(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.delete(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
    return res(ctx.status(204))
  })
]
