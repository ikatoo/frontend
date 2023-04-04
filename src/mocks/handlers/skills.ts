import { rest } from 'msw'
import env from '../../helpers/env'
import { mockSkillsPageData } from '../../pages/Skills/mock'

export default [
  rest.get(`${env.VITE_API_URL}/skill`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSkillsPageData))
  }),
  rest.post(`${env.VITE_API_URL}/skill`, (_req, res, ctx) => {
    return res(ctx.status(201))
  }),
  rest.patch(`${env.VITE_API_URL}/skill`, (_req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.delete(`${env.VITE_API_URL}/skill`, (_req, res, ctx) => {
    return res(ctx.status(204))
  })
]
