import * as Styles from './styles'

type DaysProps = {
  now: Date
  onClick?: (date: Date) => void
}

const Days = ({ now, onClick }: DaysProps) => {
  const month = now?.getMonth() ?? new Date().getMonth()
  const year = now?.getFullYear() ?? new Date().getFullYear()

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
  const weeks: Date[][] = Array.from(
    { length: Math.ceil(days.length / 7) },
    () =>
      Array.from({ length: 7 }, () => {
        day++
        return days[day]
      })
  )

  return (
    <>
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
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <Styles.Day
                  onClick={() => {
                    !!onClick && onClick(day)
                  }}
                  disabled={day?.getMonth() !== month}
                  key={dayIndex + weekIndex}
                >
                  {day?.getDate()}
                </Styles.Day>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Days
