import { rest } from 'msw'
import simpleIconsJSONMock from 'shared/mocks/simpleIconsJSONMock'

export default [
  rest.get(
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nodejs.svg',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.body("<svg key='nodejs' />"))
    }
  ),
  rest.get(
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/git.svg',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.body("<svg key='git' />"))
    }
  ),
  rest.get(
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reactjs.svg',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.body("<svg key='reactjs' />"))
    }
  ),
  rest.get(
    'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(simpleIconsJSONMock))
    }
  )
]
