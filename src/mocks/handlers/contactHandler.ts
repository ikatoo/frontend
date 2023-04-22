import { rest } from 'msw'
import env from '../../helpers/env'
import contactPageMock from '../contactPageMock'

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
