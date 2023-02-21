import { Meta, StoryFn } from '@storybook/react'
import { rest } from 'msw'

import { Skills } from '.'
import env from '../../helpers/env'
import { skillsPageRequestHandlers } from '../../mocks/handlers/skills'
import { skillsPageMock } from '../../mocks/skillsPageMock'

export default {
  title: 'Pages/Skills',
  component: Skills,
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/skills`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(skillsPageMock))
        }),
        ...skillsPageRequestHandlers
      ]
    }
  },
  decorators: [
    (Story) => (
      <div className="bg-mck_black_light text-mck_gray_light">{Story()}</div>
    )
  ]
} as Meta<typeof Skills>

export const Default = {} as StoryFn<typeof Skills>
