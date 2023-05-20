import { InputHTMLAttributes, useEffect, useState } from 'react'

import { Calendar } from '@styled-icons/boxicons-regular'
import Month from '../Month'
import Styles from './styles'
import Dropdown from '../Dropdown'

export type DateInputProps = {
  onDateChange?: (value: string) => void
  label?: string
  labelColor?: 'black' | 'white'
  initialValue?: string
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  error?: string
  name: string
  monthAndYearOnly?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const DateInput = ({
  iconPosition = 'left',
  label,
  labelColor = 'black',
  name,
  initialValue = '',
  error,
  disabled = false,
  onDateChange,
  monthAndYearOnly,
  ...props
}: DateInputProps) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    !!onDateChange && onDateChange(value)
  }, [onDateChange, value])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onDateChange && onDateChange(newValue)
  }

  const icon = <Calendar />

  const dateFormat: Intl.DateTimeFormatOptions = monthAndYearOnly
    ? {
        month: '2-digit',
        year: 'numeric'
      }
    : {
        dateStyle: 'short'
      }

  return (
    <Styles.Wrapper disabled={disabled}>
      {!!label && (
        <Styles.Label labelColor={labelColor} htmlFor={name}>
          {label}
        </Styles.Label>
      )}
      <Dropdown
        width="100%"
        title={
          <Styles.InputWrapper>
            {!!icon && (
              <Styles.Icon iconPosition={iconPosition}>{icon}</Styles.Icon>
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
        }
      >
        <Month
          monthAndYearOnly={monthAndYearOnly}
          onClick={(date) =>
            setValue(date.toLocaleDateString(undefined, dateFormat))
          }
        />
      </Dropdown>
      <Styles.Error isEnabled={!!error}>{error}</Styles.Error>
    </Styles.Wrapper>
  )
}

export default DateInput
