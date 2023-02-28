import { Meta, StoryFn } from '@storybook/react'

import IconCloud from '.'

export default {
  title: 'Components/IconCloud',
  component: IconCloud
} as Meta<typeof IconCloud>

export const Default: StoryFn<typeof IconCloud> = () => (
  <div style={{ width: '10rem', backgroundColor: '#130341' }}>
    <IconCloud
      slugs={['nodejs', 'git', 'typescript', 'javascript', 'dotnet']}
    />
  </div>
)

export const UnknownImage: StoryFn<typeof IconCloud> = () => (
  <div style={{ width: '10rem', backgroundColor: '#130341' }}>
    <IconCloud slugs={['unknown']} />
  </div>
)
