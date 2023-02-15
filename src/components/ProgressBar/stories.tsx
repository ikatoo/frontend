import { Meta, StoryFn } from '@storybook/react'
import ProgressBar from '.'

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar
} as Meta<typeof ProgressBar>

export const Default: StoryFn<typeof ProgressBar> = (args) => (
  <div className="w-48 h-24 bg-mck_black_light">
    <ProgressBar {...args} />
  </div>
)

export const Animated: StoryFn<typeof ProgressBar> = (args) => (
  <div className="w-48 h-24 bg-mck_black_light">
    <ProgressBar {...args} />
  </div>
)
Animated.args = {
  timeAnimation: 5000
}
