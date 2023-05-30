import { useEffect, useState } from 'react'

import Button from 'src/components/Button'
import DateInput from 'src/components/DateInput'
import { FormContainer } from 'src/components/FormContainer'
import JobsCards from 'src/components/JobsCards'
import TagEditor, { Tag } from 'src/components/TagEditor'
import TextArea from 'src/components/TextArea'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import { dateToStringFormat } from 'src/helpers/date'
import { useAlert } from 'src/hooks/useAlert'
import skillsService from 'src/services/skillsService'
import { Job, SkillsPageProps } from 'src/types/SkillsPage'
import Styles from './styles'

export const AdminSkills = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState<string>('')
  const [lastJobs, setLastJobs] = useState<Job[] | []>([])
  const [description, setDescription] = useState<string>('')
  const [skills, setSkills] = useState<Tag[]>([])
  const [jobTitle, setJobTitle] = useState('')
  const [jobStart, setJobStart] = useState('')
  const [jobEnd, setJobEnd] = useState('')
  const [jobLink, setJobLink] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [initialData, setInitialData] = useState<SkillsPageProps>()
  const [focus, setFocus] = useState(true)
  const [initialDataIsEmpty, setInitialDataIsEmpty] = useState(true)

  useEffect(() => {
    const getInitialData = async () => {
      const result = await skillsService.get()
      if (result?.data) {
        setInitialData(result.data)
        setInitialDataIsEmpty(false)
      }
    }
    getInitialData()
  }, [])

  useEffect(() => {
    setTitle(initialData?.title ?? '')
    setDescription(initialData?.description ?? '')
    setSkills(
      initialData?.skills.map((skill) => ({ title: skill.skillTitle })) ?? []
    )
    setLastJobs(initialData?.lastJobs ?? [])
  }, [initialData, setLastJobs])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const mappedLastJobs = lastJobs.map((job) => ({
      ...job,
      yearMonthEnd: job.yearMonthEnd
        ? dateToStringFormat(job.yearMonthEnd)
        : undefined,
      yearMonthStart: dateToStringFormat(job.yearMonthStart)
    }))

    const data = {
      title,
      description,
      skills: skills.map((skill) => ({
        skillTitle: skill.title
      })),
      lastJobs: mappedLastJobs
    }

    if (!initialData && !!initialDataIsEmpty) {
      skillsService.create(data)
      setInitialDataIsEmpty(false)
      setAlert({
        title: 'Success on create skills page.',
        type: 'message'
      })
    } else {
      skillsService.patch(data)
      setAlert({ title: 'Success on update skills page.', type: 'message' })
    }
  }

  const onChangeSkills = (values: Tag[]) => {
    setSkills(values)
  }

  const addJob = () => {
    setLastJobs([
      ...lastJobs,
      {
        jobTitle,
        jobDescription,
        link: jobLink,
        yearMonthStart: jobStart,
        yearMonthEnd: jobEnd
      }
    ])
    setJobTitle('')
    setJobDescription('')
    setJobLink('')
    setJobStart('')
    setJobEnd('')
  }

  const removeJob = (job: Job) => {
    const jobs = lastJobs.filter((_job) => _job !== job)
    setLastJobs(jobs)
  }

  const clearJobFields = () => {
    setJobTitle('')
    setJobDescription('')
    setJobLink('')
    setJobStart('')
    setJobEnd('')
  }

  const handleReset = () => {
    clearJobFields()
    setTitle('')
    setDescription('')
    setSkills([])
    setLastJobs([])
    setFocus(true)
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Suas habilidades e experiências.'}>
        <FormContainer>
          <Styles.Form
            onSubmit={handleSubmit}
            onReset={handleReset}
            method="post"
            name="skillsPageForm"
          >
            <Styles.TextWrapper>
              <TextInput
                focus={focus}
                onBlur={() => {
                  setFocus(false)
                }}
                initialValue={title}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={setTitle}
                autoFocus={focus}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextArea
                name="description"
                initialValue={description}
                label="Descrição"
                placeholder="Descrição"
                labelColor="white"
                onTextAreaChange={setDescription}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TagEditor
                name="skills"
                title="Habilidades"
                initalValue={skills}
                onChangeTags={onChangeSkills}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <Styles.FieldSet>
                <legend role="label">Últimos Trabalhos</legend>
                <Styles.Full>
                  <Styles.Fill>
                    <Styles.JobTitle>
                      <TextInput
                        name="jobTitle"
                        placeholder="Nome da empresa ou projeto em que trabalhou."
                        label="Nome da empresa ou projeto"
                        labelColor="white"
                        initialValue={jobTitle}
                        onInputChange={setJobTitle}
                      />
                    </Styles.JobTitle>
                    <Styles.DatesWrapper>
                      <DateInput
                        monthAndYearOnly
                        name="jobStart"
                        placeholder="mm/YYYY"
                        label="Início"
                        labelColor="white"
                        initialValue={jobStart}
                        onDateChange={setJobStart}
                      />
                      <DateInput
                        monthAndYearOnly
                        name="jobEnd"
                        placeholder="mm/YYYY"
                        label="Fim"
                        labelColor="white"
                        initialValue={jobEnd}
                        onDateChange={setJobEnd}
                      />
                    </Styles.DatesWrapper>
                  </Styles.Fill>
                </Styles.Full>
                <Styles.Full>
                  <Styles.Fill>
                    <TextInput
                      name="jobLink"
                      label="Link para referência"
                      placeholder="Ex: https://github.com/seu_repo/seu_projeto ou https://empresa_em_que_trabalhou.com.br"
                      labelColor="white"
                      initialValue={jobLink}
                      onInputChange={setJobLink}
                    />
                  </Styles.Fill>
                </Styles.Full>
                <Styles.Full>
                  <Styles.Fill>
                    <TextInput
                      name="jobDescription"
                      label="Breve Descrição"
                      maxLength={100}
                      labelColor="white"
                      initialValue={jobDescription}
                      onInputChange={setJobDescription}
                    />
                  </Styles.Fill>
                  <Styles.InlineButton>
                    <Button
                      styleType="secondary"
                      type="button"
                      onClick={() => {
                        addJob()
                      }}
                      disabled={
                        !jobTitle.length ||
                        !jobDescription.length ||
                        !jobStart.length ||
                        !jobLink.length
                      }
                    >
                      ADICIONAR TRABALHO
                    </Button>
                  </Styles.InlineButton>
                </Styles.Full>

                <JobsCards
                  jobs={lastJobs}
                  showRemoveButton
                  removeJobFunction={removeJob}
                />
              </Styles.FieldSet>
            </Styles.TextWrapper>

            <Styles.Actions>
              {initialDataIsEmpty ? (
                <Button styleType="primary">Salvar</Button>
              ) : (
                <Button styleType="primary">Atualizar</Button>
              )}
              <Button styleType="secondary" type="reset">
                Limpar
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
