import type { Meta, StoryObj } from '@storybook/react'
import DateInput from '.'

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  render: () => (
    <DateInput name="Initial Date" onDateChange={(date) => console.log(date)} />
  )
}

export const Month_and_Year: Story = {
  render: () => (
    <DateInput
      monthAndYearOnly
      name="Initial Date"
      onDateChange={(date) => console.log(date)}
    />
  )
}
