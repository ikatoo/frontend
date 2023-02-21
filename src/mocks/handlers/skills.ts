import { rest } from 'msw'
import env from '../../helpers/env'

export const skillsPageRequestHandlers = [
  rest.get(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
  rest.post(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(201))
  }),
  rest.put(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.delete(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
    return res(ctx.status(204))
  })
]
