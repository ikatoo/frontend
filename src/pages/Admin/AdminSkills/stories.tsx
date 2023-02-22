import { Meta, StoryFn } from '@storybook/react'
import { AdminSkills } from '.'
import { skillsPageRequestHandlers } from '../../../mocks/handlers/skills'
import { rest } from 'msw'
import env from '../../../helpers/env'
import { skillsPageMock } from '../../../mocks/skillsPageMock'

export default {
  title: 'Pages/Privates/AdminSkills',
  parameters: {
    msw: {
      handlers: skillsPageRequestHandlers
    }
  },
  component: AdminSkills,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof AdminSkills>

export const Default = {} as StoryFn<typeof AdminSkills>
export const WithData = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/skills`, (_req, res, ctx) =>
          res(ctx.status(200), ctx.json(skillsPageMock))
        ),
        ...skillsPageRequestHandlers
      ]
    }
  }
} as unknown as StoryFn<typeof AdminSkills>
