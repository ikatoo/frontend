import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { RecoveryPage } from '.'

const meta: Meta<typeof RecoveryPage> = {
  title: 'Pages/RecoveryPage',
  component: RecoveryPage,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export default meta
type Story = StoryObj<typeof RecoveryPage>

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <RecoveryPage />
    </MemoryRouter>
  )
}
