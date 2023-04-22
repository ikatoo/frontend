import { afterAll, afterEach, beforeAll } from 'vitest'
import { mswServer } from './mswServer'

global.fetch = fetch

// Start server before all tests
beforeAll(() => mswServer.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => mswServer.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => mswServer.resetHandlers())
