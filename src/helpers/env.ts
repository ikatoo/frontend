const env = (key: string) => {
  if (import.meta.env[key] === undefined)
    console.error(`*** ${key} IS UNDEFINED. ***`)
  return `${import.meta.env[key] ?? ''}`
}

export default {
  VITE_API_SECRETS: env('VITE_API_SECRETS'),
  VITE_API_URL: env('VITE_API_URL'),
  VITE_PORT: env('VITE_PORT'),
  VITE_GEOAPIFY_KEY: env('VITE_GEOAPIFY_KEY')
}
