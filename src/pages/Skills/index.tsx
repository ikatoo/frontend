import { useEffect, useState } from 'react'
import {} from 'react-router-dom'
import Card, { CardProps } from '../../components/Card'
import ProgressBar from '../../components/ProgressBar'
import { TextContainer } from '../../components/TextContainer'
import skillsService from '../../services/skillsService'
import Styles from './styles'

type SkillProps = {
  skillTitle: string
  rankPercent: number
}

type JobProps = {
  yearMonthStart: string
  yearMonthEnd?: string
  jobTitle: string
  jobDescription: string
  link: string
}

export type SkillsProps = {
  title: string
  description: string
  skills: SkillProps[]
  lastJobs: JobProps[]
}

export const Skills = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<SkillProps[]>([])
  const [lastJobs, setLastJobs] = useState<JobProps[]>([])

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = (await skillsService.get())?.data
      initialData?.title && setTitle(initialData.title)
      initialData?.description && setDescription(initialData.description)
      initialData?.skills && setSkills(initialData.skills)
      initialData?.lastJobs && setLastJobs(initialData.lastJobs)
    }

    getInitialData()
  }, [])

  return (
    <Styles.Wrapper>
      <Styles.Text>
        {!!title && (
          <TextContainer title={title}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TextContainer>
        )}
      </Styles.Text>

      {!!(!!skills.length || !!lastJobs.length) && (
        <Styles.Skills>
          {!!skills.length && (
            <Styles.Progress>
              <Styles.Subtitle>Estudo</Styles.Subtitle>
              {skills.map(({ skillTitle, rankPercent }, index) => (
                <ProgressBar
                  key={index}
                  label={skillTitle}
                  percent={rankPercent}
                />
              ))}
            </Styles.Progress>
          )}

          {!!lastJobs.length && (
            <Styles.JobsWrapper>
              <Styles.Subtitle>Últimos Trabalhos</Styles.Subtitle>
              <Styles.Jobs>
                {lastJobs.map(
                  (
                    {
                      jobTitle,
                      jobDescription,
                      yearMonthStart,
                      yearMonthEnd,
                      link
                    },
                    index
                  ) => {
                    const content: CardProps = {
                      title: jobTitle,
                      subTitle: `${yearMonthStart} | ${yearMonthEnd || 'Hoje'}`,
                      content: jobDescription
                    }

                    return (
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                      >
                        <Card stretch {...content} />
                      </a>
                    )
                  }
                )}
              </Styles.Jobs>
            </Styles.JobsWrapper>
          )}
        </Styles.Skills>
      )}
    </Styles.Wrapper>
  )
}
