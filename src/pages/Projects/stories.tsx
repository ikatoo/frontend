import projectsHandler from 'shared/msw/handlers/projectsHandler'
import { Projects } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Projects> = {
  title: 'Pages/Projects',
  component: Projects,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: projectsHandler
    }
  }
}

export default meta
type Story = StoryObj<typeof Projects>

export const Default: Story = {
  render: () => <Projects />
}
