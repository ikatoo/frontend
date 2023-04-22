import type { Meta, StoryObj } from '@storybook/react'
import TagEditor from '.'
import aboutPageMock from '../../mocks/aboutPageMock'

const meta: Meta<typeof TagEditor> = {
  title: 'Components/TagEditor',
  component: TagEditor
}

export default meta
type Story = StoryObj<typeof TagEditor>

export const Primary: Story = {
  render: () => (
    <div style={{ width: '100%', height: '100%' }}>
      <TagEditor name="tags" title="Tags" initalValue={[]} />
    </div>
  )
}

export const withInitialValue: Story = {
  render: () => (
    <div className="w-80 p-15">
      <TagEditor name="tags" title="Tags" initalValue={aboutPageMock.skills} />
    </div>
  )
}
