import type { Meta, StoryObj } from '@storybook/react'
import Month from '.'

const meta: Meta<typeof Month> = {
  title: 'Components/Month',
  component: Month
}

export default meta
type Story = StoryObj<typeof Month>

export const Default: Story = {
  render: () => (
    <div className="w-full">
      <Month />
    </div>
  )
}

export const MonthAndYearOnly: Story = {
  render: () => (
    <div className="w-full">
      <Month
        monthAndYearOnly
        onClick={(date) => {
          alert(date)
        }}
      />
    </div>
  )
}
