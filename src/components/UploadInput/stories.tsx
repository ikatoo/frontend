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
        name="snapshot"
        placeholder="Faça upload de imagem para ilustrar seu projeto ou portforio."
        label="Snapshot ou ilustração"
        labelColor="black"
        uploadFn={() => {
          console.log('click')
        }}
      />
    </div>
  )
}