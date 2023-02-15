import { Meta, StoryFn } from '@storybook/react'

import Card from '.'
import { mockProjects } from '../../pages/Projects/mock'

export default {
  title: 'Components/Card',
  component: Card,
  args: {
    ...mockProjects[1].description,
    image: mockProjects[1].snapshot
  }
} as Meta<typeof Card>

export const Default = {} as StoryFn<typeof Card>
Default.decorators = [(Story) => <div className="max-w-sm">{Story()}</div>]
