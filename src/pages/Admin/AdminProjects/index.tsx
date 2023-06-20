import { useEffect, useState } from 'react'

import Button from 'src/components/Button'
import { FormContainer } from 'src/components/FormContainer'
import TagEditor from 'src/components/TagEditor'
import TextArea from 'src/components/TextArea'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import { useAlert } from 'src/hooks/useAlert'
import { ProjectProps } from 'src/pages/Projects'
import projectsService from 'src/services/projectsService'
import Styles from './styles'

export const AdminProjects = () => {
  const { setAlert } = useAlert()

  const [snapshot, setSnapshot] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')
  const [githubLink, setGithubLink] = useState('')
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
          content,
          title,
          subTitle
        },
        githubLink,
        snapshot
      })
      setAlert({
        title: 'Success on create projects page.',
        type: 'message'
      })
    } else {
      projectsService.patch(7, {
        description: {
          content,
          title,
          subTitle
        },
        githubLink,
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
            <Styles.TextWrapper>
              <TextInput
                initialValue={title}
                focus={titleFocused}
                onBlur={() => {
                  setTitleFocused(false)
                }}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={(value) => setTitle(value)}
                autoFocus={titleFocused}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextArea
                name="editor"
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
                <legend role="label">Imagem</legend>
                <TextInput
                  name="illustrationURL"
                  placeholder="https://domain.com/image.jpg"
                  label="Imagem URL"
                  labelColor="white"
                  initialValue={illustrationURL}
                  onInputChange={(value) => setIllustrationURL(value)}
                />
                <TextInput
                  name="illustrationALT"
                  placeholder="Uma breve descrição da imagem"
                  label="Imagem ALT"
                  labelColor="white"
                  initialValue={illustrationALT}
                  onInputChange={(value) => setIllustrationALT(value)}
                />
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
