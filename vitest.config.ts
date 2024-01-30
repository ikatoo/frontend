import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitestGlobalReact.ts'],
    testTimeout: 15000
  },
  resolve: {
    alias: {
      src: `${__dirname}/src`
    }
  }
})
