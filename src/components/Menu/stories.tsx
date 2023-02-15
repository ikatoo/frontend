import { Meta, StoryFn, Parameters } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import Menu from '.'
import { mockedMenu } from './mock'

export default {
  title: 'Components/Menu',
  component: Menu,
  args: mockedMenu,
  decorators: [
    (Story) => <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>
  ]
} as Meta<typeof Menu>

export const Default = {} as StoryFn<typeof Menu>
export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  } as Parameters
} as StoryFn<typeof Menu>
