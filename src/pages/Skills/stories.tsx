import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Skills } from '.'
import skills from '../../mocks/handlers/skillsHandler'

export default {
  title: 'Pages/Skills',
  component: Skills,
  decorators: [
    (Story) => (
      <div className="bg-mck_black_light text-mck_gray_light">{Story()}</div>
    )
  ],
  parameters: {
    msw: {
      handlers: skills
    }
  }
} as ComponentMeta<typeof Skills>

export const Default = {} as ComponentStory<typeof Skills>
