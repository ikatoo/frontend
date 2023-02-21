import { Meta, StoryFn } from '@storybook/react'
import { rest } from 'msw'

import { AdminAbout } from '.'
import { aboutPageMock } from '../../../mocks/aboutPageMock'
import { AlertProvider } from '../../../hooks/useAlert'
import env from '../../../helpers/env'
import { aboutPageRequestHandlers } from '../../../mocks/handlers/about'

const handlers = aboutPageRequestHandlers

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
        rest.get(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(aboutPageMock))
        }),
        ...handlers
      ]
    }
  }
} as unknown as StoryFn<typeof AdminAbout>
