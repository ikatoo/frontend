import { Delete } from '@styled-icons/material-outlined'
import { Job } from 'src/types/SkillsPage'
import Card, { CardProps } from '../Card'
import Styles from './styles'

type JobsCardsProps = {
  jobs: Job[]
  title: string
  showRemoveButton?: boolean
  removeJobFunction?: (job: Job) => void
}

const JobsCards = (props: JobsCardsProps) => {
  const removeJob = (job: Job) => {
    props.removeJobFunction && props.removeJobFunction(job)
  }

  return (
    <Styles.JobsWrapper>
      <Styles.Subtitle>{props.title}</Styles.Subtitle>
      <Styles.Jobs>
        {props.jobs.map((job, index) => {
          const content: CardProps = {
            title: job.jobTitle,
            subTitle: `${job.yearMonthStart} | ${job.yearMonthEnd || 'Hoje'}`,
            content: job.jobDescription
          }

          return (
            <div key={index} data-testid="job-testid">
              {props.showRemoveButton && (
                <Styles.ButtonWrapper>
                  <Styles.RemoveJobButton
                    data-testid="remove_button-testid"
                    onClick={() => removeJob(job)}
                  >
                    <Delete />
                  </Styles.RemoveJobButton>
                </Styles.ButtonWrapper>
              )}
              <Card link={job.link} {...content} />
            </div>
          )
        })}
      </Styles.Jobs>
    </Styles.JobsWrapper>
  )
}

export default JobsCards
