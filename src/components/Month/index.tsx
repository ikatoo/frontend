import { CaretLeft, CaretRight } from '@styled-icons/boxicons-regular'
import * as Styles from './styles'

const Month = () => {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()
  const monthLength = new Date(year, month + 1, 0).getDate()
  const days: Date[] = Array.from(
    { length: monthLength },
    (_, i) => new Date(year, month, i + 1)
  )

  const weekHeader = Array.from({ length: 7 }, (_, i) => {
    i = i - 1
    return new Date(year, month, i + 1).toLocaleString(undefined, {
      weekday: 'narrow'
    })
  })

  return (
    <Styles.Calendar>
      <Styles.MonthHeader>
        <CaretLeft size={32} />
        {now.toDateString().split(' ')[1]}
        <CaretRight size={32} />
      </Styles.MonthHeader>
      <Styles.WeekHeader>
        {weekHeader.map((day) => (
          <td key={day}>{day}</td>
        ))}
      </Styles.WeekHeader>
      {days.map((day) => {
        return <Styles.Date key={day.getDate()}>{day.getDate()}</Styles.Date>
      })}
    </Styles.Calendar>
  )
}

export default Month
