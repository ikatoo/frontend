import type { Meta, StoryObj } from '@storybook/react'
import DateInput from '.'

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Primary: Story = {
  render: () => <DateInput name="Initial Date" />
}
