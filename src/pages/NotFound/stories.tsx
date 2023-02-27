import { Meta, StoryFn } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { NotFound } from '.'

export default {
  title: 'Pages/NotFound',
  component: NotFound,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className="bg-mck_black_light">{Story()}</div>
      </MemoryRouter>
    )
  ]
} as Meta<typeof NotFound>

export const Default = {} as StoryFn<typeof NotFound>
