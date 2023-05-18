import { CaretLeft, CaretRight } from '@styled-icons/boxicons-regular'
import { useState } from 'react'
import Days from './Days'
import MonthAndYear from './MonthAndYear'
import * as Styles from './styles'

type MonthProps = {
  date?: Date
  monthAndYearOnly?: boolean
  onClick?: (date: Date) => void
}

const Month = ({
  date = new Date(),
  monthAndYearOnly,
  onClick
}: MonthProps) => {
  const [now, setNow] = useState(date ?? new Date())
  const [enabledMonthYear, setEnabledMonthYear] = useState(monthAndYearOnly)

  const month = now?.getMonth() ?? new Date().getMonth()
  const year = now?.getFullYear() ?? new Date().getFullYear()

  const preview = () => {
    setNow(
      enabledMonthYear
        ? new Date(year - 1, month, 1)
        : new Date(year, month - 1, 1)
    )
  }
  const next = () => {
    setNow(
      enabledMonthYear
        ? new Date(year + 1, month, 1)
        : new Date(year, month + 1, 1)
    )
  }

  const toggle = () => {
    setEnabledMonthYear(!enabledMonthYear)
  }

  return (
    <Styles.Calendar>
      <Styles.Header>
        <Styles.ChangeMonth onClick={preview}>
          <CaretLeft size={32} />
        </Styles.ChangeMonth>

        <Styles.YearMonth onClick={toggle}>
          {!enabledMonthYear &&
            now
              ?.toLocaleDateString(undefined, {
                month: 'long'
              })
              .toLocaleUpperCase() + ' / '}
          {now
            ?.toLocaleDateString(undefined, {
              year: 'numeric'
            })
            .toLocaleUpperCase()}
        </Styles.YearMonth>
        <Styles.ChangeMonth onClick={next}>
          <CaretRight size={32} />
        </Styles.ChangeMonth>
      </Styles.Header>

      {enabledMonthYear ? (
        <MonthAndYear
          now={now}
          onClick={(date) => {
            !!onClick && onClick(date)
          }}
        />
      ) : (
        <Days
          now={now}
          onClick={(date) => {
            !!onClick && onClick(date)
          }}
        />
      )}
    </Styles.Calendar>
  )
}

export default Month
