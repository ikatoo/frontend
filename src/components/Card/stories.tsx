import type { Meta, StoryObj } from '@storybook/react'
import projectsMock from 'shared/mocks/projectsMock/result.json'
import Card from '.'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card
}

export default meta
type Story = StoryObj<typeof Card>

const mock = projectsMock[1]

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card title={mock.title} content={mock.description} />
    </div>
  )
}

export const With_Image: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card
        title={mock.title}
        content={mock.description}
        image={mock.snapshot}
      />
    </div>
  )
}
