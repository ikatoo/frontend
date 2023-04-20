import { Close } from '@styled-icons/material-outlined'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextInput from '../TextInput'
import Styles from './styles'

export type Tag = {
  title: string
}

type TagEditorProps = {
  name: string
  title: string
  initalValue?: Tag[]
}

const TagEditor = (props: TagEditorProps) => {
  const [tags, setTags] = useState<Tag[]>(props.initalValue ?? [])
  const [newTag, setNewTag] = useState('')
  const [alert, setAlert] = useState('')

  const deleteTag = (title: string) => {
    const newTag = tags.filter((tag) => tag.title !== title)
    setTags(newTag)
  }

  const addTag = () => {
    const exist = !!tags.find((tag) => tag.title === newTag)
    if (!!newTag?.trim() && newTag.length && !exist) {
      setTags([...tags, { title: newTag }])
      setNewTag('')
    } else if (exist) {
      setAlert(`${newTag} alread exist.`)
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.currentTarget.value)
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const isTriggerKey =
      key === ',' || key === 'Enter' || (event.shiftKey && key === 'Enter')
    if (isTriggerKey) {
      addTag()
      event.preventDefault()
    }
  }

  return (
    <>
      <Styles.TagsWrapper>
        {tags.map((tag) => (
          <Styles.Tag data-testid="tag-testid" key={tag.title}>
            {tag.title}
            <Styles.DeleteButton onClick={() => deleteTag(tag.title)}>
              <Close size={16} />
            </Styles.DeleteButton>
          </Styles.Tag>
        ))}
      </Styles.TagsWrapper>
      <TextInput
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        placeholder={`Press "," | "Enter" | "Shift+Enter" to add ${props.title}`}
        value={newTag}
        name={props.name}
        label={props.title}
        labelColor="white"
        autoFocus
      />
      <Styles.Alert isEnabled={!!alert.length}>{alert}</Styles.Alert>
    </>
  )
}

export default TagEditor
