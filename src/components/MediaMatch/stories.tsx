import { Meta, StoryFn, Parameters } from '@storybook/react'
import MediaMatch from '.'

export default {
  title: 'Components/MediaMatch',
  component: MediaMatch
} as Meta<typeof MediaMatch>

export const Desktop: StoryFn<typeof MediaMatch> = () => (
  <MediaMatch greaterThan="md">Only on Desktop</MediaMatch>
)

export const Mobile: StoryFn<typeof MediaMatch> = () => (
  <MediaMatch lessThan="md">Only on Mobile</MediaMatch>
)
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2'
  }
} as Parameters
