import { useEffect, useState } from 'react'
import JobsCards from 'src/components/JobsCards'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { Job } from 'src/types/SkillsPage'
import ProgressBar from '../../components/ProgressBar'
import { TextContainer } from '../../components/TextContainer'
import skillsService from '../../services/skillsService'
import Styles from './styles'

type SkillProps = {
  skillTitle: string
}

export type SkillsProps = {
  title: string
  description: string
  skills: SkillProps[]
  lastJobs: Job[]
}

export const Skills = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<SkillProps[]>([])
  const [lastJobs, setLastJobs] = useState<Job[]>([])

  useEffect(() => {
    setPageSubtitle('Skills Page')

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
