import { Close } from '@styled-icons/material-outlined'
import { FormEvent, useState } from 'react'
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

  const deleteTag = (title: string) => {
    const newTag = tags.filter((tag) => tag.title !== title)
    setTags(newTag)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const tagInput = document.getElementsByName(props.name)[0]
    const newTag = tagInput.getAttribute('value')
    const exist = !!tags.find((tag) => tag.title === newTag)
    if (!!newTag?.trim() && newTag.length && !exist) {
      setTags([...tags, { title: newTag }])
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
      <form onSubmit={handleSubmit}>
        <TextInput name={props.name} label={props.title} labelColor="white" />
      </form>
    </>
  )
}

export default TagEditor
