import { ComponentMeta, ComponentStory } from '@storybook/react'

import Card from '.'
import projectsMock from '../../mocks/projectsMock'

export default {
  title: 'Components/Card',
  component: Card,
  args: {
    ...projectsMock[1].description,
    image: projectsMock[1].snapshot
  }
} as ComponentMeta<typeof Card>

export const Default = {} as ComponentStory<typeof Card>
Default.decorators = [(Story) => <div className="max-w-sm">{Story()}</div>]
