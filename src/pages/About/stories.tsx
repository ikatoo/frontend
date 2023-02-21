import { Meta, StoryFn } from '@storybook/react'
import { rest } from 'msw'

import { About } from '.'
import env from '../../helpers/env'
import { aboutPageMock } from '../../mocks/aboutPageMock'
import { aboutPageRequestHandlers } from '../../mocks/handlers/about'

export default {
  title: 'Pages/About',
  component: About,
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(aboutPageMock))
        }),
        ...aboutPageRequestHandlers
      ]
    }
  },
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof About>

export const Default = {} as StoryFn<typeof About>
