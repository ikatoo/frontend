import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { NotFound } from '.'

const meta: Meta<typeof NotFound> = {
  title: 'Pages/NotFound',
  component: NotFound
}

export default meta
type Story = StoryObj<typeof NotFound>

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/']}>
      <div className="bg-mck_black_light">
        <NotFound />
      </div>
    </MemoryRouter>
  )
}
