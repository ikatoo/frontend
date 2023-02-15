import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import TextEditor from '.'

export default {
  title: 'Components/TextEditor',
  component: TextEditor
} as Meta<typeof TextEditor>

export const Default: StoryFn<typeof TextEditor> = () => {
  const [data, setData] = useState('')
  return (
    <div className="w-full grid">
      <textarea value={data} onChange={(e) => setData(e.target.value)} />
      <h1>{data}</h1>
      <TextEditor
        label="Editor"
        name="editor"
        placeholder="Editor"
        initialValue={data}
        onChange={setData}
      />
    </div>
  )
}
