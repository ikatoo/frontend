import { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import DataTable from '../../../components/DataTable'
import { FormContainer } from '../../../components/FormContainer'
import { TextContainer } from '../../../components/TextContainer'
import TextEditor from '../../../components/TextEditor'
import TextInput from '../../../components/TextInput'
import { useAlert } from '../../../hooks/useAlert'
import skillsService from '../../../services/skillsService'
import { LastJob, Skill } from '../../../types/SkillsPage'
import Styles from './styles'
import { Delete, Edit } from '@styled-icons/material-outlined'
import ProgressBar from '../../../components/ProgressBar'

type SkillsDataTableHead = {
  Title: string
  Level: number | React.ReactNode
  Actions: React.ReactNode
}

type JobsDataTableHead = {
  Title: string
  Description: string
  Start: string
  End?: string
  Actions: React.ReactNode
}

export const AdminSkills = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<Skill[]>([])
  const [lastJobs, setLastJobs] = useState<LastJob[]>([])
  const [createOrUpdate, setCreateOrUpdate] = useState<'create' | 'update'>(
    'create'
  )

  const [skillsDataTable, setSkillsDataTable] =
    useState<SkillsDataTableHead[]>()
  const [jobsDataTable, setJobsDataTable] = useState<JobsDataTableHead[]>()

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = await skillsService.get()
      if (Object.keys(initialData).length) {
        setTitle(initialData.title)
        setDescription(initialData.description)
        setSkills(initialData.skills)
        setLastJobs(initialData.lastJobs)
        setCreateOrUpdate('update')
      }
    }
    getInitialData()
  }, [])

  useEffect(() => {
    setSkillsDataTable(
      skills.map((skill) => ({
        Title: skill.skillTitle,
        Level: (
          <ProgressBar
            title={`${skill.skillTitle}: ${skill.rankPercent}%`}
            percent={skill.rankPercent}
            heightInRem={0.3}
          />
        ),
        Actions: (
          <div className="flex gap-4 justify-center">
            <Button title={`Edit data: ${skill.skillTitle}`} icon={<Edit />} />
            <Button
              title={`Delete data: ${skill.skillTitle}`}
              icon={<Delete />}
              styleType="dangerous"
            />
          </div>
        )
      }))
    )
  }, [skills])

  useEffect(() => {
    setJobsDataTable(
      lastJobs.map((job) => ({
        Title: job.jobTitle,
        Description: job.jobDescription,
        Start: job.yearMonthStart,
        End: job.yearMonthEnd,
        Actions: (
          <div className="flex gap-4 justify-center">
            <Button title={`Edit data: ${job.jobTitle}`} icon={<Edit />} />
            <Button
              title={`Delete data: ${job.jobTitle}`}
              icon={<Delete />}
              styleType="dangerous"
            />
          </div>
        )
      }))
    )
  }, [lastJobs])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const skillsPageData = {
      title,
      description,
      skills,
      lastJobs
    }

    if (createOrUpdate === 'create') {
      skillsService.create(skillsPageData)
      setAlert({
        title: 'Success on create skills page.',
        type: 'message'
      })
    } else {
      skillsService.update(skillsPageData)
      setAlert({ title: 'Success on update skills page.', type: 'message' })
    }
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Informações sobre você.'}>
        <FormContainer>
          <Styles.Form onSubmit={handleSubmit} method="post">
            <Styles.TextWrapper>
              <TextInput
                initialValue={title}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={setTitle}
                tabIndex={1}
                autoFocus
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextEditor
                initialValue={description || ''}
                label="Descrição"
                labelColor="white"
                name="description"
                placeholder="Descrição"
                onChange={setDescription}
                tabIndex={2}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              {skillsDataTable?.length ? (
                <DataTable
                  name="skills"
                  label="Skills"
                  labelColor="white"
                  data={skillsDataTable}
                />
              ) : null}
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              {jobsDataTable?.length ? (
                <DataTable
                  name="lastJobs"
                  label="Last Jobs"
                  labelColor="white"
                  data={jobsDataTable}
                />
              ) : null}
            </Styles.TextWrapper>

            <Styles.Actions>
              <Button tabIndex={6} styleType="primary">
                Salvar
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
