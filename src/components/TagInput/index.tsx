import { InputHTMLAttributes, useState } from 'react'

import { Close } from '@styled-icons/material-outlined'
import Styles from './styles'

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
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    if (tag.length && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setInputValue('')
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((_tag) => _tag !== tag))
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setInputValue(newValue)
    if (newValue.endsWith(',')) {
      addTag(newValue.split(',')[0])
    }

    !!onInputChange && onInputChange(newValue)
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'backspace' && !inputValue.length) {
      const lastValue = tags.pop()
      lastValue && removeTag(lastValue)
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
              <Styles.Tag data-testid="tag-test-id" key={tag}>
                {tag}
                <Close onClick={() => removeTag(tag)} size={15} />
              </Styles.Tag>
            ))}
        </Styles.TagsWrapper>
        <Styles.Input
          type="text"
          onChange={onChange}
          onKeyUp={onKeyUp}
          value={inputValue}
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
