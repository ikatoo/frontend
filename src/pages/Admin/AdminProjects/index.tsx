import { useEffect, useState } from 'react'
import Button from 'src/components/Button'
import DateInput from 'src/components/DateInput'
import Form, { Actions } from 'src/components/Form'
import { FormContainer } from 'src/components/FormContainer'
import ProgressBar from 'src/components/ProgressBar'
import { ProjectCard } from 'src/components/ProjectCard'
import TagEditor from 'src/components/TagEditor'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import UploadInput from 'src/components/UploadInput'
import { useUser } from 'src/contexts/User/UserContext'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { useAlert } from 'src/hooks/useAlert'
import { getGithubDates } from 'src/services/github'
import imageService from 'src/services/imageService'
import projectsService, { CreateProject } from 'src/services/projectsService'
import Styles from './styles'

type Skill = { title: string }

export const AdminProjects = () => {
  const { setAlert } = useAlert()
  const { user } = useUser()

  const [snapshotUrl, setSnapshotUrl] = useState('')
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<Skill[]>([])
  const [githubRepo, setGithubRepo] = useState('')
  const [githubOwner, setGithubOwner] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [initialData, setInitialData] = useState<CreateProject[]>()
  const [titleFocused, setTitleFocused] = useState(true)
  const [progressUpload, setProgressUpload] = useState(0)
  const [resetUpload, setResetUpload] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const disabledButton =
    !title.length ||
    !start ||
    !lastUpdate ||
    !description.length ||
    !snapshotUrl.length ||
    !githubRepo.length

  useEffect(() => {
    if (!!githubRepo && !!githubOwner)
      setGithubLink(`https://github.com/${githubOwner}/${githubRepo}`)
  }, [githubOwner, githubRepo])

  useEffect(() => {
    if (githubLink) {
      const [owner, repo] = githubLink
        .replace('https://github.com/', '')
        .split('/')
      setGithubOwner(owner)
      setGithubRepo(repo)
    }
  }, [githubLink])

  useEffect(() => {
    setPageSubtitle('Edit Projects Page')

    const getInitialData = async () => {
      if (user?.id) {
        const result = await projectsService.getByUserId(+user.id)
        setInitialData(result?.data)
      }
    }
    getInitialData()
  }, [user?.id])

  const addProject = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = {
      title,
      description,
      snapshot: snapshotUrl,
      repositoryLink: githubLink,
      start: new Date(start.split('/').reverse().join('/')),
      lastUpdate: new Date(lastUpdate.split('/').reverse().join('/')),
      skills,
      userId: user?.id ?? 0
    }

    const { status, data: newProject } = await projectsService.create(data)

    if (status === 201) {
      const projects: CreateProject[] = initialData
        ? [...initialData, { id: newProject.id, ...data }]
        : [{ id: newProject.id, ...data }]
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

    const data: CreateProject = {
      title,
      description,
      snapshot: snapshotUrl,
      repositoryLink: githubLink,
      start: new Date(start.split('/').reverse().join('/')),
      lastUpdate: new Date(lastUpdate.split('/').reverse().join('/')),
      skills,
      userId: user?.id ?? 0
    }

    const { status } = await projectsService.patch(id, data)
    if (status === 204) {
      const projects = initialData.filter((project) => project.id !== id)
      const updatedProjects: CreateProject[] = [...projects, { id, ...data }]
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

  const editProject = (project: CreateProject) => {
    setEditMode(true)
    if (!project.id) {
      setEditMode(false)
      return
    }

    setId(project.id)
    setTitle(project.title)
    setStart(
      new Date(project.start).toLocaleDateString('pt-BR', {
        month: 'numeric',
        year: 'numeric'
      })
    )
    setLastUpdate(
      new Date(project.lastUpdate).toLocaleDateString('pt-BR', {
        month: 'numeric',
        year: 'numeric'
      })
    )
    setDescription(project.description)
    setSnapshotUrl(project.snapshot)
    setGithubLink(project.repositoryLink)
    setSkills(project.skills)
  }

  const clearFields = (event?: React.FormEvent) => {
    !!event && event.preventDefault()

    setTitle('')
    setDescription('')
    setStart('')
    setLastUpdate('')
    setGithubOwner('')
    setGithubRepo('')
    setGithubLink('')
    setSnapshotUrl('')
    setResetUpload(true)
    setTitleFocused(true)
    setSkills([])
    setId(0)
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

  const onChangeGithub = async () => {
    if (!!githubOwner && !!githubRepo) {
      const { createdAt, pushedAt } = await getGithubDates(
        githubOwner,
        githubRepo
      )
      setStart(
        new Date(createdAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })
      )
      setLastUpdate(
        new Date(pushedAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })
      )
    }
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Seus projetos ou portfolio.'}>
        <FormContainer>
          <Form name="projectsPageForm">
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
                    onBlur={onChangeGithub}
                  />
                  <TextInput
                    name="githubProjectName"
                    placeholder="Nome do repositório"
                    label="Projeto"
                    labelColor="white"
                    initialValue={githubRepo}
                    onInputChange={setGithubRepo}
                    onBlur={onChangeGithub}
                  />
                </Styles.RowWrapper>
                <Styles.GithubLink>{githubLink}</Styles.GithubLink>
              </Styles.GithubDetails>
              <Styles.DatesWrapper>
                <DateInput
                  name="start"
                  placeholder="dd/mm/YYYY"
                  label="Início"
                  labelColor="white"
                  initialValue={start}
                  onDateChange={setStart}
                />
                <DateInput
                  name="lastUpdate"
                  placeholder="dd/mm/YYYY"
                  label="Última atualização"
                  labelColor="white"
                  initialValue={lastUpdate}
                  onDateChange={setLastUpdate}
                />
              </Styles.DatesWrapper>
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

            <Actions>
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
            </Actions>
          </Form>
        </FormContainer>

        {!!initialData?.length && (
          <Styles.FieldSet>
            <legend role="label">Últimos Trabalhos</legend>
            {initialData.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                editProject={editProject}
                removeProject={removeProject}
              />
            ))}
          </Styles.FieldSet>
        )}
      </TextContainer>
    </Styles.Wrapper>
  )
}
