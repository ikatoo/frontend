import { Job } from 'src/types/SkillsPage'
import Styles from './styles'
import Card, { CardProps } from '../Card'
import CloseButton from '../CloseButton'

type JobsCardsProps = {
  jobs: Job[]
  title: string
  showRemoveButton?: boolean
}

const JobsCards = (props: JobsCardsProps) => {
  return (
    <Styles.JobsWrapper>
      <Styles.Subtitle>{props.title}</Styles.Subtitle>
      <Styles.Jobs>
        {props.jobs.map(
          (
            { jobTitle, jobDescription, yearMonthStart, yearMonthEnd, link },
            index
          ) => {
            const content: CardProps = {
              title: jobTitle,
              subTitle: `${yearMonthStart} | ${yearMonthEnd || 'Hoje'}`,
              content: jobDescription
            }

            return (
              <a href={link} target="_blank" rel="noreferrer" key={index}>
                {props.showRemoveButton && (
                  <Styles.CloseButton>
                    <CloseButton />
                  </Styles.CloseButton>
                )}
                <Card {...content} />
              </a>
            )
          }
        )}
      </Styles.Jobs>
    </Styles.JobsWrapper>
  )
}

export default JobsCards
