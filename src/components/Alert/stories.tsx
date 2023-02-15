import { Meta, StoryFn } from '@storybook/react'

import Alert from '.'

export default {
  title: 'Components/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div className="h-screen w-full bg-mck_black_light">{Story()}</div>
    )
  ]
} as Meta<typeof Alert>

export const WithAlert = {} as StoryFn<typeof Alert>
WithAlert.args = {
  title: 'Alert Title',
  type: 'alert'
}

export const WithError = {} as StoryFn<typeof Alert>
export const WithMessage = {} as StoryFn<typeof Alert>
