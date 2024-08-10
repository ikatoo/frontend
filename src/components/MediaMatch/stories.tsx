import { Meta, Parameters, StoryFn } from '@storybook/react'
import MediaMatch from '.'

export default {
  title: 'Components/MediaMatch',
  component: MediaMatch
} as Meta<typeof MediaMatch>

export const Desktop: StoryFn<typeof MediaMatch> = () => (
  <MediaMatch $greaterThan="md">
    Some visible on Desktop If changed to less than md=768px this is hidden
  </MediaMatch>
)

export const Mobile: StoryFn<typeof MediaMatch> = () => (
  <MediaMatch $lessThan="md">
    Some visible on Mobile If changed to greater than md=768px this is hidden
  </MediaMatch>
)
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2'
  }
} as Parameters
