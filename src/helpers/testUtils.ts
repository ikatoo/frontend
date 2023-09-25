import { waitFor as testingLibraryWaitFor } from '@testing-library/react'

export const waitFor = async (fn: () => void) =>
  await testingLibraryWaitFor(fn, { timeout: 10000 })
