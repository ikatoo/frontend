import { rest } from 'msw'
import contactPageMock from 'shared/mocks/contactPageMock/result.json'
import env from 'src/helpers/env'

export default [
  rest.get(`${env.VITE_API_URL}/contact`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contactPageMock))
  }),
  rest.post(`${env.VITE_API_URL}/contact`, (_req, res, ctx) => {
    return res(ctx.status(201))
  }),
  rest.patch(`${env.VITE_API_URL}/contact`, (_req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.delete(`${env.VITE_API_URL}/contact`, (_req, res, ctx) => {
    return res(ctx.status(204))
  })
]
