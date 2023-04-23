import { rest } from 'msw'
import env from '../../../helpers/env'
import { mswServer } from '../mswServer'

export default (status: number, result?: object) => {
  mswServer.use(
    rest.get(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
      return res(ctx.status(status), ctx.json(result))
    })
  )
}
