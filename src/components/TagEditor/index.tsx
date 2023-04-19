import { useState } from 'react'
import TextInput from '../TextInput'
import Styles from './styles'

type Tag = {
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

  return (
    <>
      <Styles.TagsWrapper>
        {tags.map((tag) => (
          <Styles.Tag data-testid="tag-testid" key={tag.title}>
            {tag.title}
            <Styles.DeleteButton onClick={() => deleteTag(tag.title)} />
          </Styles.Tag>
        ))}
      </Styles.TagsWrapper>
      <TextInput name={props.name} label={props.title} labelColor="white" />
    </>
  )
}

export default TagEditor
