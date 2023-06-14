import { About } from '.'

import type { Meta, StoryObj } from '@storybook/react'
import aboutHandler from 'shared/msw/handlers/aboutHandler'

const meta: Meta<typeof About> = {
  title: 'Pages/About',
  component: About,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
}

export default meta
type Story = StoryObj<typeof About>

export const Default: Story = {
  render: () => <About />
}

Default.parameters = {
  msw: {
    handlers: aboutHandler
  }
}
