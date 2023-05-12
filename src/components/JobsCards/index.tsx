import { Delete } from '@styled-icons/material-outlined'
import { Job } from 'src/types/SkillsPage'
import Card, { CardProps } from '../Card'
import Styles from './styles'

type JobsCardsProps = {
  jobs: Job[]
  title: string
  showRemoveButton?: boolean
  removeJob?: () => void
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
              <div key={index}>
                {props.showRemoveButton && (
                  <Styles.ButtonWrapper>
                    <Styles.RemoveJobButton onClick={props.removeJob}>
                      <Delete />
                    </Styles.RemoveJobButton>
                  </Styles.ButtonWrapper>
                )}
                <Card link={link} {...content} />
              </div>
            )
          }
        )}
      </Styles.Jobs>
    </Styles.JobsWrapper>
  )
}

export default JobsCards
