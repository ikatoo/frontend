import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { SignUpPage } from '.'

const meta: Meta<typeof SignUpPage> = {
  title: 'Pages/SignUpPage',
  component: SignUpPage,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export default meta
type Story = StoryObj<typeof SignUpPage>

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <SignUpPage />
    </MemoryRouter>
  )
}
