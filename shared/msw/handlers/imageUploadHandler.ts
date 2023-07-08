import { rest } from 'msw'
import env from 'src/helpers/env'

export default [
  rest.get(`${env.VITE_API_URL}/image/id/7`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ url: `${env.VITE_API_URL}/image/id/7` })
    )
  }),
  rest.post(`${env.VITE_API_URL}/image`, (req, res, ctx) => {
    if (!req.params.file) return res(ctx.status(400, 'File is required.'))
    if (!(req.params.file as unknown as File).type.startsWith('image/'))
      return res(ctx.status(415, 'Unsupported Media Type.'))
    return res(
      ctx.status(201),
      ctx.json({ url: `${env.VITE_API_URL}/image/id/7` })
    )
  })
]
