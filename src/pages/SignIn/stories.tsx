import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { SignInPage } from '.'

const meta: Meta<typeof SignInPage> = {
  title: 'Pages/SignInPage',
  component: SignInPage,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export default meta
type Story = StoryObj<typeof SignInPage>

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <SignInPage />
    </MemoryRouter>
  )
}
