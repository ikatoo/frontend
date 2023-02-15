import { InputHTMLAttributes, useEffect, useState } from 'react'

import Styles from './styles'
import { Close } from '@styled-icons/material-outlined'

export type TagInputProps = {
  onInputChange?: (value: string) => void
  label?: string
  labelColor?: 'black' | 'white'
  initialValue?: string[]
  disabled?: boolean
  error?: string
  name: string
} & InputHTMLAttributes<HTMLInputElement>

const TagInput = ({
  label,
  labelColor = 'black',
  name,
  initialValue = [],
  error,
  disabled = false,
  onInputChange,
  ...props
}: TagInputProps) => {
  const [tags, setTags] = useState(initialValue)
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    setTags(initialValue)
  }, [initialValue])

  const addTag = (tag: string) => {
    if (tag.length && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setNewTag('')
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((_tag) => _tag !== tag))
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setNewTag(newValue)
    if (newValue.endsWith(',')) {
      addTag(newValue.split(',')[0])
    }

    !!onInputChange && onInputChange(newValue)
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'backspace' && !newTag.length) {
      // removeLastTag()
    }
  }

  return (
    <Styles.Wrapper disabled={disabled} error={!!error}>
      {!!label && (
        <Styles.Label labelColor={labelColor} htmlFor={name}>
          {label}
        </Styles.Label>
      )}
      <Styles.InputWrapper>
        <Styles.TagsWrapper>
          {tags.length > 0 &&
            tags.map((tag) => (
              <Styles.Tag key={tag}>
                {tag}
                <Close onClick={() => removeTag(tag)} size={15} />
              </Styles.Tag>
            ))}
        </Styles.TagsWrapper>
        <Styles.Input
          type="text"
          onChange={onChange}
          onKeyUp={onKeyUp}
          value={newTag}
          disabled={disabled}
          name={name}
          {...(label ? { id: name } : {})}
          {...props}
        />
      </Styles.InputWrapper>
      {!!error && <Styles.Error>{error}</Styles.Error>}
    </Styles.Wrapper>
  )
}

export default TagInput
