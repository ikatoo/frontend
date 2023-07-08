import type { Meta, StoryObj } from '@storybook/react'
import UploadInput from '.'

const meta: Meta<typeof UploadInput> = {
  title: 'Components/UploadInput',
  component: UploadInput
}

export default meta
type Story = StoryObj<typeof UploadInput>

export const Default: Story = {
  render: () => (
    <div className="min-w-full max-w-full w-full flex flex-col md:flex-row gap-2">
      <UploadInput
        showUploadButton
        name="snapshot"
        label="Snapshot ou ilustração"
        labelColor="black"
        onChangeFile={(file) => {
          console.log('file name', file.name)
          console.log('file type', file.type)
          console.log('file size', file.size)
        }}
        uploadFn={() => {
          console.log('upload function')
        }}
      />
    </div>
  )
}

export const Disabled: Story = {
  args: {
    showUploadButton: true,
    name: 'test',
    disabled: true
  }
}

export const Without_Upload_Button: Story = {
  args: {
    name: 'test'
  }
}
