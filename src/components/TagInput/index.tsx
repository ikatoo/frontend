import { InputHTMLAttributes, useState } from 'react'

import { Close } from '@styled-icons/material-outlined'
import Styles from './styles'

export type TagInputProps = {
  onTagsChange: (value: string[]) => void
  label?: string
  labelColor?: 'black' | 'white'
  initialTags?: string[]
  disabled?: boolean
  error?: string
  name: string
} & InputHTMLAttributes<HTMLInputElement>

const TagInput = ({
  label,
  labelColor = 'black',
  name,
  initialTags = [],
  error,
  disabled = false,
  onTagsChange,
  ...props
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    if (tag.length && !initialTags.includes(tag)) {
      onTagsChange([...initialTags, tag])
    }
    setInputValue('')
  }

  const removeTag = (tag: string) => {
    const newTags = initialTags.filter((_tag) => _tag !== tag)
    onTagsChange(newTags)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    if (newValue.endsWith(',')) {
      addTag(newValue.split(',')[0])
    } else {
      setInputValue(newValue)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'backspace' && !inputValue.length) {
      const newValue = initialTags.slice(0, initialTags.length - 1)
      onTagsChange(newValue)
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
          {initialTags.length > 0 &&
            initialTags.map((tag) => (
              <Styles.Tag data-testid="tag-test-id" key={tag}>
                {tag}
                <Styles.CloseWrapper onClick={() => removeTag(tag)}>
                  <Close size={15} />
                </Styles.CloseWrapper>
              </Styles.Tag>
            ))}
        </Styles.TagsWrapper>
        <Styles.Input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
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
