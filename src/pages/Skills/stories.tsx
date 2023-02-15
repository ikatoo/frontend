import { Meta, StoryFn } from '@storybook/react'
import { Skills } from '.'

export default {
  title: 'Pages/Skills',
  component: Skills,
  decorators: [
    (Story) => (
      <div className="bg-mck_black_light text-mck_gray_light">{Story()}</div>
    )
  ]
} as Meta<typeof Skills>

export const Default = {} as StoryFn<typeof Skills>
