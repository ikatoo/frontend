import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Contact } from '.'
import contact from '../../mocks/handlers/contactHandler'

export default {
  title: 'Pages/Contact',
  component: Contact,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: contact
    }
  }
} as ComponentMeta<typeof Contact>

export const Default = {} as ComponentStory<typeof Contact>
