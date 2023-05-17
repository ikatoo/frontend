import * as Styles from './styles'

type DaysProps = {
  weekHeader: string[]
  weeks: JSX.Element[][]
}

const Days = ({ weekHeader, weeks }: DaysProps) => (
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
          <tr key={weekIndex}>{week.map((day) => day)}</tr>
        ))}
      </tbody>
    </table>
  </>
)

export default Days
