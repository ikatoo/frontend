import { http, HttpResponse } from 'msw'
import simpleIconsJSONMock from 'shared/mocks/simpleIconsJSONMock'

export default [
  http.get(
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nodejs.svg',
    () => {
      return new HttpResponse("<svg key='nodejs' />")
    }
  ),
  http.get(
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/git.svg',
    () => {
      return new HttpResponse("<svg key='git' />")
    }
  ),
  http.get(
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reactjs.svg',
    () => {
      return new HttpResponse("<svg key='reactjs' />")
    }
  ),
  http.get(
    'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json',
    () => {
      return HttpResponse.json(simpleIconsJSONMock)
    }
  )
]
