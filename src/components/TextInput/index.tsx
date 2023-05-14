import { InputHTMLAttributes, useEffect, useState } from 'react'

import Styles from './styles'

export type TextInputProps = {
  onInputChange?: (value: string) => void
  label?: string
  labelColor?: 'black' | 'white'
  initialValue?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  error?: string
  name: string
} & InputHTMLAttributes<HTMLInputElement>

const TextInput = ({
  icon,
  iconPosition = 'left',
  label,
  labelColor = 'black',
  name,
  initialValue = '',
  error,
  disabled = false,
  onInputChange,
  ...props
}: TextInputProps) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInputChange && onInputChange(newValue)
  }

  return (
    <Styles.Wrapper disabled={disabled}>
      {!!label && (
        <Styles.Label labelColor={labelColor} htmlFor={name}>
          {label}
        </Styles.Label>
      )}
      <Styles.InputWrapper>
        {!!icon && (
          <Styles.Icon iconPosition={iconPosition}>{icon}</Styles.Icon>
        )}

        {!!props.maxLength && (
          <Styles.Length>{props.maxLength - value.length}</Styles.Length>
        )}
        <Styles.Input
          type="text"
          onChange={onChange}
          value={value}
          iconPosition={iconPosition}
          disabled={disabled}
          name={name}
          {...(label ? { id: name } : {})}
          {...props}
          tabIndex={props.tabIndex ?? 0}
        />
      </Styles.InputWrapper>
      <Styles.Error isEnabled={!!error}>{error}</Styles.Error>
    </Styles.Wrapper>
  )
}

export default TextInput
