import { useEffect, useState } from 'react'

import Styles from './styles'
import Button from 'src/components/Button'
import { FormContainer } from 'src/components/FormContainer'
import TagEditor, { Tag } from 'src/components/TagEditor'
import TextArea from 'src/components/TextArea'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import { useAlert } from 'src/hooks/useAlert'
import skillsService from 'src/services/skillsService'
import { Job, SkillsPageProps } from 'src/types/SkillsPage'
import JobsCards from 'src/components/JobsCards'

export const AdminSkills = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [skills, setSkills] = useState<Tag[]>([])
  const [lastJobs, setLastJobs] = useState<Job[] | []>([])
  const [jobTitle, setJobTitle] = useState('')
  const [jobStart, setJobStart] = useState('')
  const [jobEnd, setJobEnd] = useState('')
  const [jobLink, setJobLink] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [initialData, setInitialData] = useState<SkillsPageProps>()

  useEffect(() => {
    const getInitialData = async () => {
      const result = await skillsService.get()
      if (result) {
        setInitialData(result.data)
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
  }, [initialData])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!initialData) {
      skillsService.create({
        title,
        description,
        skills: skills.map((skill) => ({
          skillTitle: skill.title,
          rankPercent: 0
        })),
        lastJobs
      })
      setAlert({
        title: 'Success on create skills page.',
        type: 'message'
      })
    } else {
      skillsService.patch({
        title: title,
        description: description,
        skills: skills.map((skill) => ({
          skillTitle: skill.title,
          rankPercent: 0
        })),
        lastJobs
      })
      setAlert({ title: 'Success on update skills page.', type: 'message' })
    }
  }

  const onChangeTags = (values: Tag[]) => {
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
  }

  const removeJob = (job: Job) => {
    const jobs = lastJobs.filter((_job) => _job !== job)
    setLastJobs(jobs)
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Informações sobre você.'}>
        <FormContainer>
          <Styles.Form
            onSubmit={handleSubmit}
            method="post"
            name="skillsPageForm"
          >
            <Styles.TextWrapper>
              <TextInput
                initialValue={title}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={(value) => setTitle(value)}
                autoFocus
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextArea
                name="description"
                initialValue={description}
                label="Descrição"
                placeholder="Descrição"
                labelColor="white"
                onTextAreaChange={(value) => setDescription(value)}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TagEditor
                name="skills"
                title="Habilidades"
                initalValue={skills}
                onChangeTags={onChangeTags}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <Styles.FieldSet>
                <legend role="label">Últimos Trabalhos</legend>
                <TextInput
                  name="jobTitle"
                  placeholder="Nome da empresa ou projeto em que trabalhou."
                  label="Nome da empresa ou projeto"
                  labelColor="white"
                  initialValue={jobTitle}
                  onInputChange={(value) => setJobTitle(value)}
                />
                <TextInput
                  name="jobStart"
                  placeholder="mm/YYYY"
                  label="Início"
                  labelColor="white"
                  initialValue={jobStart}
                  onInputChange={(value) => setJobStart(value)}
                />
                <TextInput
                  name="jobEnd"
                  placeholder="mm/YYYY"
                  label="Fim"
                  labelColor="white"
                  initialValue={jobEnd}
                  onInputChange={(value) => setJobEnd(value)}
                />
                <TextInput
                  name="jobLink"
                  label="Link para referência"
                  placeholder="Ex: https://github.com/seu_repo/seu_projeto ou https://empresa_em_que_trabalhou.com.br"
                  labelColor="white"
                  initialValue={jobLink}
                  onInputChange={(value) => setJobLink(value)}
                />
                <TextInput
                  name="jobDescription"
                  label="Breve Descrição"
                  labelColor="white"
                  initialValue={jobDescription}
                  onInputChange={(value) => setJobDescription(value)}
                />

                <JobsCards
                  jobs={lastJobs}
                  title="Últimos Trabalhos"
                  showRemoveButton
                  removeJobFunction={removeJob}
                />

                <Button type="button" onClick={addJob}>
                  ADICIONAR TRABALHO
                </Button>
              </Styles.FieldSet>
            </Styles.TextWrapper>

            <Styles.Actions>
              {!initialData && <Button styleType="primary">Salvar</Button>}
              {!!initialData && <Button styleType="primary">Atualizar</Button>}
              <Button styleType="secondary" type="reset">
                Limpar Formulário
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
