import { useEffect, useState } from 'react'

import Button from 'src/components/Button'
import Card from 'src/components/Card'
import DateInput from 'src/components/DateInput'
import { FormContainer } from 'src/components/FormContainer'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import UploadInput from 'src/components/UploadInput'
import { useAlert } from 'src/hooks/useAlert'
import { ProjectProps } from 'src/pages/Projects'
import projectsService from 'src/services/projectsService'
import Styles from './styles'

export const AdminProjects = () => {
  const { setAlert } = useAlert()

  const [snapshot, setSnapshot] = useState('')
  const [title, setTitle] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [description, setDescription] = useState('')
  const [refLink, setRefLink] = useState('')
  const [initialData, setInitialData] = useState<ProjectProps[]>()
  const [titleFocused, setTitleFocused] = useState(true)

  useEffect(() => {
    const getInitialData = async () => {
      const result = await projectsService.get()
      setInitialData(result?.data)
    }
    getInitialData()
  }, [])

  // useEffect(() => {
  //   initialData?.description && setDescription(initialData.description)
  //   initialData?.snapshot && setSnapshot(initialData.snapshot)
  //   initialData?.githubLink && setGithubLink(initialData.githubLink)
  // }, [initialData])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!initialData) {
      projectsService.create({
        description: {
          content: description,
          title,
          subTitle: lastUpdate
        },
        githubLink: refLink,
        snapshot
      })
      setAlert({
        title: 'Success on create projects page.',
        type: 'message'
      })
    } else {
      projectsService.patch(7, {
        description: {
          content: description,
          title,
          subTitle: lastUpdate
        },
        githubLink: refLink,
        snapshot
      })
      setAlert({ title: 'Success on update projects page.', type: 'message' })
    }
  }

  const onReset = () => {
    // setTitle('')
    // setDescription('')
    // setSkills([])
    // setIllustrationURL('')
    // setIllustrationALT('')
    // setTitleFocused(true)
  }

  const upload = () => {
    throw new Error('Function not implemented.')
  }

  // const onChangeTags = (values: Tag[]) => {
  //   setSkills(values)
  // }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Seus projetos ou portfolio.'}>
        <FormContainer>
          <Styles.Form
            onSubmit={handleSubmit}
            onReset={onReset}
            method="post"
            name="projectsPageForm"
          >
            <Styles.Full>
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
            </Styles.Full>

            <TextInput
              name="description"
              placeholder="Motivação, caracteristicas ou funcionalidades com até 100 caracteres."
              maxLength={100}
              label="Breve Descrição"
              labelColor="white"
              initialValue={description}
              onInputChange={setDescription}
            />

            <Styles.Full>
              <Styles.Fill>
                <UploadInput
                  name="snapshot"
                  placeholder="Faça upload de imagem para ilustrar seu projeto ou portforio."
                  label="Snapshot ou ilustração"
                  labelColor="white"
                  uploadFn={upload}
                />
              </Styles.Fill>
            </Styles.Full>

            <TextInput
              name="link"
              placeholder="Ex: https://github.com/seu_repo/seu_projeto ou https://site.com.br"
              label="Link para referência"
              labelColor="white"
              initialValue={refLink}
              onInputChange={setRefLink}
            />

            <Styles.Actions>
              <Button styleType="primary">Adicionar</Button>
              <Button styleType="secondary" type="reset">
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
