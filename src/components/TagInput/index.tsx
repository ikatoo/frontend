import { InputHTMLAttributes, useEffect, useState } from 'react'

import Styles from './styles'

export type TagInputProps = {
  onInputChange?: (value: string) => void
  label?: string
  labelColor?: 'black' | 'white'
  initialValue?: string
  disabled?: boolean
  error?: string
  name: string
} & InputHTMLAttributes<HTMLInputElement>

const TagInput = ({
  label,
  labelColor = 'black',
  name,
  initialValue = '',
  error,
  disabled = false,
  onInputChange,
  ...props
}: TagInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInputChange && onInputChange(newValue)
  }

  return (
    <Styles.Wrapper disabled={disabled} error={!!error}>
      {!!label && (
        <Styles.Label labelColor={labelColor} htmlFor={name}>
          {label}
        </Styles.Label>
      )}
      <Styles.InputWrapper>
        <Styles.Input
          type="text"
          onChange={onChange}
          value={value}
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
