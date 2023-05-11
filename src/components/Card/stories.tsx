import type { Meta, StoryObj } from '@storybook/react'
import Card from '.'
import projectsMock from 'src/mocks/projectsMock'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card {...projectsMock[1].description} />
    </div>
  )
}

export const With_Image: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card {...projectsMock[1].description} image={projectsMock[1].snapshot} />
    </div>
  )
}
