type MonthAndYearProps = {
  now: Date
}

const MonthAndYear = ({ now }: MonthAndYearProps) => {
  let month = -1
  const months = Array.from({ length: 4 }, () =>
    Array.from({ length: 3 }, () => {
      month++
      return new Date(now.getFullYear(), month, 1)
        .toLocaleDateString(undefined, { month: 'long' })
        .toLocaleUpperCase()
    })
  )

  return (
    <>
      <table>
        <tbody>
          {months.map((month, monthIndex) => (
            <tr key={monthIndex}>
              {month.map((day) => (
                <td key={day}>{day}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MonthAndYear
