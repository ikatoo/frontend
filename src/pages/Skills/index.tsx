import { useEffect, useState } from 'react'
import {} from 'react-router-dom'
import JobsCards from 'src/components/JobsCards'
import ProgressBar from '../../components/ProgressBar'
import { TextContainer } from '../../components/TextContainer'
import skillsService from '../../services/skillsService'
import Styles from './styles'

type SkillProps = {
  skillTitle: string
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
              {skills.map(({ skillTitle }, index) => (
                // <ProgressBar
                //   key={index}
                //   label={skillTitle}
                //   percent={rankPercent}
                // />
                <ProgressBar key={index} label={skillTitle} percent={0} />
              ))}
            </Styles.Progress>
          )}

          <JobsCards jobs={lastJobs} title="Últimos Trabalhos" />
        </Styles.Skills>
      )}
    </Styles.Wrapper>
  )
}
