import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      port: +env.VITE_PORT
    },
    preview: {
      port: +env.VITE_PORT
    },
    resolve: {
      alias: {
        src: `${__dirname}/src`
      }
    }
  }
})
