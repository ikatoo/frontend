import { ComponentMeta, ComponentStory } from '@storybook/react'
import { About } from '.'
import about from '../../mocks/handlers/about'

export default {
  title: 'Pages/About',
  component: About,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: about
    }
  }
} as ComponentMeta<typeof About>

export const Default = {} as ComponentStory<typeof About>
