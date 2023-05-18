import * as Styles from './styles'

type MonthAndYearProps = {
  now: Date
  onClick?: (date: Date) => void
}

const MonthAndYear = ({ now, onClick }: MonthAndYearProps) => {
  let month = -1
  const months = Array.from({ length: 4 }, () =>
    Array.from({ length: 3 }, () => {
      month++
      return new Date(now.getFullYear(), month, 1)
    })
  )

  return (
    <>
      <table>
        <tbody>
          {months.map((monthRow, rowIndex) => (
            <tr key={rowIndex}>
              {monthRow.map((month, colIndex) => (
                <Styles.Month
                  onClick={() => {
                    !!onClick && onClick(month)
                  }}
                  key={colIndex + rowIndex}
                >
                  {month
                    .toLocaleDateString(undefined, { month: 'long' })
                    .toLocaleUpperCase()}
                </Styles.Month>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MonthAndYear
