import { mswServer } from '../mswServer'
import createHandlers, { HandlerProps } from './createHandlers'

export default (props: HandlerProps[]) => {
  const handlers = createHandlers(props)

  mswServer.use(...handlers)
}
