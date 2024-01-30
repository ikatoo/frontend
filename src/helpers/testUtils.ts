import {
  waitFor as testingLibraryWaitFor,
  waitForOptions
} from '@testing-library/react'
import { HttpHandler } from 'msw'
import { SetupServer } from 'msw/lib/node'

export const waitFor = async (fn: () => void, options?: waitForOptions) => {
  return await testingLibraryWaitFor(fn, {
    ...options,
    timeout: options?.timeout ?? 15000
  })
}

export const serverUse = (server: SetupServer, handlers: HttpHandler[]) => {
  server.use(...handlers)
  server.listen({ onUnhandledRequest: 'error' })
}
