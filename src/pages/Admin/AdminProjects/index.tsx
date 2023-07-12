import { useEffect, useState } from 'react'

import Button from 'src/components/Button'
import Card from 'src/components/Card'
import DateInput from 'src/components/DateInput'
import { FormContainer } from 'src/components/FormContainer'
import ProgressBar from 'src/components/ProgressBar'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import UploadInput from 'src/components/UploadInput'
import { dateToStringFormat } from 'src/helpers/date'
import { useAlert } from 'src/hooks/useAlert'
import { ProjectProps } from 'src/pages/Projects'
import imageService from 'src/services/imageService'
import projectsService from 'src/services/projectsService'
import Styles from './styles'

export const AdminProjects = () => {
  const { setAlert } = useAlert()

  const [snapshotUrl, setSnapshotUrl] = useState('')
  // const [id, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [description, setDescription] = useState('')
  const [refLink, setRefLink] = useState('')
  const [initialData, setInitialData] = useState<ProjectProps[]>()
  const [titleFocused, setTitleFocused] = useState(true)
  const [progressUpload, setProgressUpload] = useState(0)

  useEffect(() => {
    const getInitialData = async () => {
      const result = await projectsService.get()
      setInitialData(result?.data)
    }
    getInitialData()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = {
      description: {
        title,
        subTitle: `Last update: ${dateToStringFormat(lastUpdate)}`,
        content: description
      },
      snapshot: snapshotUrl,
      githubLink: refLink
    }
    const { status } = await projectsService.create(data)
    if (status === 201) {
      const projects = initialData ? [...initialData, data] : [data]
      setInitialData(projects)
      setAlert({
        title: 'Success on create projects page.',
        type: 'message'
      })
    }
    // if (!initialData) {
    //   const { status } = await projectsService.create(data)
    //   if (status === 201) {
    //     setInitialData([...initialData, data])
    //     setAlert({
    //       title: 'Success on create projects page.',
    //       type: 'message'
    //     })
    //   }
    // } else {
    //   projectsService.patch(id, data)
    //   setAlert({ title: 'Success on update projects page.', type: 'message' })
    // }

    clearFields()
  }

  const clearFields = () => {
    setTitle('')
    setDescription('')
    setLastUpdate('')
    setRefLink('')
    setSnapshotUrl('')
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
              <Styles.DatesWrapper>
                <DateInput
                  monthAndYearOnly
                  name="lastUpdate"
                  placeholder="mm/YYYY"
                  label="Última atualização"
                  labelColor="white"
                  initialValue={lastUpdate}
                  onDateChange={setLastUpdate}
                />
              </Styles.DatesWrapper>
            </Styles.Fill>

            <TextInput
              name="description"
              placeholder="Motivação, caracteristicas ou funcionalidades com até 100 caracteres."
              maxLength={100}
              label="Breve Descrição"
              labelColor="white"
              initialValue={description}
              onInputChange={setDescription}
            />

            <Styles.Fill>
              <Styles.UploadWrapper>
                <Styles.UploadDropArea>
                  <UploadInput name="snapshot" onChangeFile={onChangeImage} />
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
              <Styles.LinkWrapper>
                <TextInput
                  name="link"
                  placeholder="Ex: https://github.com/seu_repo/seu_projeto ou https://site.com.br"
                  label="Link para referência"
                  labelColor="white"
                  initialValue={refLink}
                  onInputChange={setRefLink}
                />
              </Styles.LinkWrapper>
            </Styles.Fill>

            <Styles.Actions>
              <Button
                onClick={handleSubmit}
                styleType="primary"
                disabled={
                  !title.length ||
                  !lastUpdate.length ||
                  !description.length ||
                  !snapshotUrl.length ||
                  !refLink.length
                }
              >
                Adicionar
              </Button>
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
