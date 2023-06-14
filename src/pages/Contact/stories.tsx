import type { Meta, StoryObj } from '@storybook/react'
import { Contact } from '.'
import contactHandler from 'shared/msw/handlers/contactHandler'

const meta: Meta<typeof Contact> = {
  title: 'Pages/Contact',
  component: Contact,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: contactHandler
    }
  }
}

export default meta
type Story = StoryObj<typeof Contact>

export const Default: Story = {
  render: () => <Contact />
}
