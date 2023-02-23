import Styles from './styles'

export type ProgressBarProps = {
  label?: string
  percent: number
  timeAnimation?: number
  title?: string
  heightInRem?: number
}

const ProgressBar = ({
  label,
  percent,
  timeAnimation = 0,
  title,
  heightInRem
}: ProgressBarProps) => {
  const animated = !!timeAnimation
  return (
    <Styles.Wrapper title={title} $timeAnimation={timeAnimation}>
      {(label ?? '' !== '') && <span>{label}</span>}
      <Styles.WrapperBar style={{ height: `${heightInRem}rem` }}>
        <Styles.Bar $animated={animated} style={{ width: `${percent}%` }} />
      </Styles.WrapperBar>
    </Styles.Wrapper>
  )
}

export default ProgressBar
