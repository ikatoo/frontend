import { CaretLeft, CaretRight } from '@styled-icons/boxicons-regular'
import { useEffect, useState } from 'react'
import * as Styles from './styles'

type MonthProps = {
  date?: Date
}

const Month = ({ date = new Date() }: MonthProps) => {
  const [now, setNow] = useState(date)

  useEffect(() => {
    setNow(date)
  }, [date])

  const month = now.getMonth()
  const year = now.getFullYear()
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const monthLength = lastDayOfMonth.getDate()
  const firstDayOfMonth = new Date(year, month, 1)

  const lastDaysPrevMonth = Array.from(
    { length: firstDayOfMonth.getDay() },
    (_, i) => new Date(year, month, 1 - (i + 1))
  ).reverse()
  const firstDaysNextMonth = Array.from(
    { length: 6 - lastDayOfMonth.getDay() },
    (_, i) => new Date(year, month, lastDayOfMonth.getDate() + (i + 1))
  )

  const days: Date[] = [
    ...lastDaysPrevMonth,
    ...Array.from(
      { length: monthLength },
      (_, i) => new Date(year, month, i + 1)
    ),
    ...firstDaysNextMonth
  ]

  const weekHeader = Array.from({ length: 7 }, (_, i) => {
    i = i - 1
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), i + 1).toLocaleString(
      undefined,
      {
        weekday: 'narrow'
      }
    )
  })

  let day = -1
  const weeks: JSX.Element[][] = Array.from(
    { length: Math.ceil(days.length / 7) },
    () =>
      Array.from({ length: 7 }, () => {
        day++
        return (
          <Styles.Day disabled={days[day]?.getMonth() !== month} key={day}>
            {days[day]?.getDate()}
          </Styles.Day>
        )
      })
  )

  return (
    <Styles.Calendar>
      <Styles.MonthHeader>
        <CaretLeft size={32} />
        {now.toDateString().split(' ')[1]}
        <CaretRight size={32} />
      </Styles.MonthHeader>
      <table>
        <thead>
          <tr>
            {weekHeader.map((day, index) => (
              <Styles.WeekHeader key={index + day}>{day}</Styles.WeekHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>{week.map((day) => day)}</tr>
          ))}
        </tbody>
      </table>
    </Styles.Calendar>
  )
}

export default Month
