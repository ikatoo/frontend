import { HttpResponse, http } from 'msw'

export type HandlerProps = {
  url: string
  method: 'get' | 'post' | 'patch' | 'delete'
  status: number
  result?: object
}

export default (props: HandlerProps[]) =>
  props.map((handler) =>
    http[handler.method](handler.url, () => {
      return HttpResponse.json(handler.result)
    })
  )
