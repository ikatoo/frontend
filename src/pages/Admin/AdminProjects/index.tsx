import { useEffect, useState } from 'react'

import { Delete, Edit } from '@styled-icons/material-outlined'
import Button from 'src/components/Button'
import Card from 'src/components/Card'
import DateInput from 'src/components/DateInput'
import { FormContainer } from 'src/components/FormContainer'
import ProgressBar from 'src/components/ProgressBar'
import TagEditor from 'src/components/TagEditor'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import UploadInput from 'src/components/UploadInput'
import { dateToStringFormat, stringToDateFormat } from 'src/helpers/date'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { useAlert } from 'src/hooks/useAlert'
import { ProjectProps } from 'src/pages/Projects'
import imageService from 'src/services/imageService'
import projectsService from 'src/services/projectsService'
import theme from 'src/theme'
import Styles from './styles'

type Skill = { title: string }

export const AdminProjects = () => {
  const { setAlert } = useAlert()

  const [snapshotUrl, setSnapshotUrl] = useState('')
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<Skill[]>([])
  const [githubRepo, setGithubRepo] = useState('')
  const [githubOwner, setGithubOwner] = useState('')
  const [initialData, setInitialData] = useState<ProjectProps[]>()
  const [titleFocused, setTitleFocused] = useState(true)
  const [progressUpload, setProgressUpload] = useState(0)
  const [resetUpload, setResetUpload] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const disabledButton =
    !title.length ||
    !lastUpdate.length ||
    !description.length ||
    !snapshotUrl.length ||
    !githubRepo.length

  useEffect(() => {
    setPageSubtitle('Edit Projects Page')

    const getInitialData = async () => {
      const result = await projectsService.get()
      setInitialData(result?.data)
    }
    getInitialData()
  }, [])

  const addProject = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = {
      description: {
        title,
        subTitle: `Last update: ${dateToStringFormat(lastUpdate)}`,
        content: description
      },
      snapshot: snapshotUrl,
      githubLink: githubRepo
    }
    const { status } = await projectsService.create(data)
    if (status === 201) {
      const projects = initialData ? [...initialData, data] : [data]
      setInitialData(projects)
      setAlert({
        title: 'Success on create project.',
        type: 'message'
      })
    }
    clearFields()
  }

  const updateProject = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!initialData || id < 1) return

    const data = {
      description: {
        title,
        subTitle: `Last update: ${dateToStringFormat(lastUpdate)}`,
        content: description
      },
      snapshot: snapshotUrl,
      githubLink: githubRepo
    }

    const { status } = await projectsService.patch(id, data)
    if (status === 204) {
      const projects = initialData.filter((project) => project.id !== id)
      const updatedProjects = [...projects, data]
      setInitialData(updatedProjects)
      setAlert({
        title: 'Success on update project.',
        type: 'message'
      })
    }

    clearFields()
    setEditMode(false)
  }

  const removeProject = async (id: number) => {
    if (!initialData || id < 1) return

    const { status } = await projectsService.delete(id)
    if (status === 204) {
      const updatedProjects = initialData.filter((project) => project.id !== id)
      setInitialData(updatedProjects)
      setAlert({
        title: 'Success on remove project.',
        type: 'message'
      })
    }
  }

  const editProject = (project: ProjectProps) => {
    setEditMode(true)
    if (!project.id) {
      setEditMode(false)
      return
    }

    setId(project.id)
    setTitle(project.description.title)
    setLastUpdate(
      stringToDateFormat(project.description.subTitle?.split(': ')[1] ?? '')
    )
    setDescription(project.description.content)
    setSnapshotUrl(project.snapshot)
    setGithubRepo(project.githubLink ?? '')
  }

  const clearFields = (event?: React.FormEvent) => {
    !!event && event.preventDefault()

    setTitle('')
    setDescription('')
    setLastUpdate('')
    setGithubRepo('')
    setSnapshotUrl('')
    setResetUpload(true)
    setTitleFocused(true)
  }

  const onChangeImage = async (file: File) => {
    const result = await imageService.upload(file, (progressEvent) => {
      const { loaded, total } = progressEvent
      const percent = total ? Math.floor((loaded * 100) / total) : 0
      setProgressUpload(percent)
    })

    if (!!result?.data || result?.status === 201) {
      setSnapshotUrl(result.data.url)
    }
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Seus projetos ou portfolio.'}>
        <FormContainer>
          <Styles.Form name="projectsPageForm">
            <Styles.Fill>
              <Styles.Title>
                <TextInput
                  name="title"
                  placeholder="Nome do projeto ou portfolio."
                  label="Título"
                  labelColor="white"
                  initialValue={title}
                  onInputChange={setTitle}
                  focus={titleFocused}
                  onBlur={() => {
                    setTitleFocused(false)
                  }}
                  autoFocus={titleFocused}
                />
              </Styles.Title>
              <Styles.UploadWrapper>
                <Styles.UploadDropArea>
                  <UploadInput
                    name="snapshot"
                    onChangeFile={onChangeImage}
                    reset={resetUpload}
                  />
                  {!!snapshotUrl.length && (
                    <a href={snapshotUrl} target="_blank" rel="noreferrer">
                      <Styles.Thumbnail
                        src={snapshotUrl}
                        alt="Snapshot Thumbnail"
                      />
                    </a>
                  )}
                </Styles.UploadDropArea>
                <ProgressBar
                  percent={progressUpload}
                  label={`${progressUpload}%`}
                />
              </Styles.UploadWrapper>
            </Styles.Fill>

            <Styles.Fill>
              <Styles.GithubDetails>
                <Styles.RowWrapper>
                  <TextInput
                    name="baseGithub"
                    label="Github"
                    labelColor="white"
                    initialValue="https://github.com/"
                    disabled
                  />
                  <TextInput
                    name="owner"
                    placeholder="Seu nome de usuário no github"
                    label="Repositório"
                    labelColor="white"
                    initialValue={githubOwner}
                    onInputChange={setGithubOwner}
                  />
                  <TextInput
                    name="githubProjectName"
                    placeholder="Nome do repositório"
                    label="Projeto"
                    labelColor="white"
                    initialValue={githubRepo}
                    onInputChange={setGithubRepo}
                  />
                </Styles.RowWrapper>
                <Styles.GithubLink>
                  https://github.com/{githubOwner}/{githubRepo}
                </Styles.GithubLink>
              </Styles.GithubDetails>
              <Styles.RowWrapper>
                <DateInput
                  monthAndYearOnly
                  name="start"
                  placeholder="mm/YYYY"
                  label="Início"
                  labelColor="white"
                  initialValue={start}
                  onDateChange={setStart}
                />
                <DateInput
                  monthAndYearOnly
                  name="lastUpdate"
                  placeholder="mm/YYYY"
                  label="Última atualização"
                  labelColor="white"
                  initialValue={lastUpdate}
                  onDateChange={setLastUpdate}
                />
              </Styles.RowWrapper>
            </Styles.Fill>

            <Styles.Fill>
              <TextInput
                name="description"
                placeholder="Motivação, caracteristicas ou funcionalidades com até 100 caracteres."
                maxLength={100}
                label="Breve Descrição"
                labelColor="white"
                initialValue={description}
                onInputChange={setDescription}
              />
              <TagEditor
                name="skills"
                title="Habilidades desenvolvidas"
                initalValue={skills}
                onChangeTags={setSkills}
              />
            </Styles.Fill>

            <Styles.Actions>
              {!editMode ? (
                <Button
                  onClick={addProject}
                  styleType="primary"
                  disabled={disabledButton}
                >
                  Adicionar
                </Button>
              ) : (
                <Button
                  onClick={updateProject}
                  styleType="primary"
                  disabled={disabledButton}
                >
                  Atualizar
                </Button>
              )}
              <Button onClick={clearFields} styleType="secondary" type="reset">
                Limpar Formulário
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>

        {!!initialData?.length && (
          <Styles.FieldSet>
            <legend role="label">Últimos Trabalhos</legend>
            {initialData.map((card, index) => (
              <Styles.CardWrapper key={index}>
                <Styles.CardActionsWrapper>
                  <Styles.CardActions>
                    <Edit
                      tabIndex={0}
                      aria-label={`edit project with title ${card.description.title}`}
                      onClick={() => {
                        editProject(card)
                      }}
                    />
                    <Delete
                      tabIndex={0}
                      aria-label={`remove project with title ${card.description.title}`}
                      onClick={() => {
                        card.id && removeProject(card.id)
                      }}
                      color={`${theme.colors.red}`}
                    />
                  </Styles.CardActions>
                </Styles.CardActionsWrapper>
                <Card
                  title={card.description.title}
                  subTitle={card.description.subTitle}
                  content={card.description.content}
                  image={card.snapshot}
                  link={card.githubLink}
                />
              </Styles.CardWrapper>
            ))}
          </Styles.FieldSet>
        )}
      </TextContainer>
    </Styles.Wrapper>
  )
}
