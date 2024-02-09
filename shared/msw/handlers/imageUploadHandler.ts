import { http, HttpResponse } from 'msw'
import env from 'src/helpers/env'

export default [
  http.get(`${env.VITE_API_URL}/image/id/7`, () => {
    return HttpResponse.json({ url: `${env.VITE_API_URL}/image/id/7` })
  }),
  http.post(`${env.VITE_API_URL}/image`, ({ params }) => {
    if (!params.file)
      return new HttpResponse('File is required.', { status: 400 })
    if (!(params.file as unknown as File).type.startsWith('image/'))
      return new HttpResponse('Unsupported Media Type.', { status: 415 })
    return HttpResponse.json(
      { url: `${env.VITE_API_URL}/image/id/7` },
      { status: 201 }
    )
  })
]
