import { Meta, StoryFn } from '@storybook/react'
import { rest } from 'msw'

import { AdminAbout } from '.'
import { aboutPageMock } from '../../../mocks/aboutPageMock'
import { AlertProvider } from '../../../hooks/useAlert'

const handlers = [
  rest.get('/about', (_req, res, ctx) => {
    return res(ctx.json({}))
  }),
  rest.post('/about', (_req, res) => {
    return res()
  }),
  rest.put('/about', (_req, res) => {
    return res()
  }),
  rest.delete('/about', (_req, res) => {
    return res()
  })
]

export default {
  title: 'Pages/Privates/AdminAbout',
  component: AdminAbout,
  parameters: {
    msw: {
      handlers
    }
  },
  decorators: [
    (Story) => (
      <AlertProvider>
        <div className="bg-mck_black_light">{Story()}</div>
      </AlertProvider>
    )
  ]
} as Meta<typeof AdminAbout>

export const Default = {} as StoryFn<typeof AdminAbout>
export const WithInitiallData = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/about', (_req, res, ctx) => {
          return res(ctx.json(aboutPageMock))
        }),
        ...handlers
      ]
    }
  }
} as unknown as StoryFn<typeof AdminAbout>
