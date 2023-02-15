import { Meta, StoryFn } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import Logo from '.'

export default {
  title: 'Components/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    )
  ]
} as Meta<typeof Logo>

export const Default = {} as StoryFn<typeof Logo>
