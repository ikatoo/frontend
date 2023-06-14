import type { Meta, StoryObj } from '@storybook/react'
import { Skills } from '.'
import skillsHandler from 'shared/msw/handlers/skillsHandler'

const meta: Meta<typeof Skills> = {
  title: 'Pages/Skills',
  component: Skills,
  decorators: [
    (Story) => (
      <div className="bg-mck_black_light text-mck_gray_light">{Story()}</div>
    )
  ],
  parameters: {
    msw: {
      handlers: [skillsHandler[1]]
    }
  }
}

export default meta
type Story = StoryObj<typeof Skills>

export const Default: Story = {}
