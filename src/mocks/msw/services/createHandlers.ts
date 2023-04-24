import { rest } from 'msw'

export type HandlerProps = {
  url: string
  method: 'get' | 'post' | 'patch' | 'delete'
  status: number
  result?: object
}

export default (props: HandlerProps[]) =>
  props.map((handler) =>
    rest[handler.method](handler.url, (_req, res, ctx) => {
      return res(ctx.status(handler.status), ctx.json(handler.result))
    })
  )
