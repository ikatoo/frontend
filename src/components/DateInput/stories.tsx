import type { Meta, StoryObj } from '@storybook/react'
import DateInput from '.'

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {
    iconPosition: {
      options: ['left', 'right'],
      control: {
        type: 'select'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  render: () => (
    <DateInput
      placeholder="dd/mm/YYYY"
      name="Initial Date"
      iconPosition="right"
      onDateChange={(date) => console.log(date)}
    />
  )
}

export const Month_and_Year: Story = {
  render: () => (
    <DateInput
      monthAndYearOnly
      placeholder="mm/YYYY"
      name="Initial Date"
      onDateChange={(date) => console.log(date)}
    />
  )
}
