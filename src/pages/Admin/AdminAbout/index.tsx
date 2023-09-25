import { useEffect, useState } from 'react'

import Button from '../../../components/Button'
import { FormContainer } from '../../../components/FormContainer'
import TagEditor, { Tag } from '../../../components/TagEditor'
import TextArea from '../../../components/TextArea'
import { TextContainer } from '../../../components/TextContainer'
import TextInput from '../../../components/TextInput'
import { useAlert } from '../../../hooks/useAlert'
import aboutService from '../../../services/aboutService'
import { AboutPageServiceProps } from '../../../types/AboutPage'
import Styles from './styles'
import setPageSubtitle from 'src/helpers/setPageSubtitle'

export const AdminAbout = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [skills, setSkills] = useState<Tag[]>([])
  const [illustrationURL, setIllustrationURL] = useState('')
  const [illustrationALT, setIllustrationALT] = useState('')
  const [initialData, setInitialData] = useState<AboutPageServiceProps>()
  const [titleFocused, setTitleFocused] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    setIsEmpty(!!(!initialData || !Object.keys(initialData).length))
  }, [initialData])

  useEffect(() => {
    setPageSubtitle('Edit About Page')

    const getInitialData = async () => {
      const result = await aboutService.get()
      setInitialData(result?.data)
    }
    getInitialData()
  }, [])

  useEffect(() => {
    initialData?.title && setTitle(initialData.title)
    initialData?.description && setDescription(initialData.description)
    initialData?.skills && setSkills(initialData.skills)
    initialData?.illustrationALT &&
      setIllustrationALT(initialData.illustrationALT)
    initialData?.illustrationURL &&
      setIllustrationURL(initialData.illustrationURL)
  }, [initialData])

  const save = async (event: React.FormEvent) => {
    event.preventDefault()

    aboutService.create({
      title,
      description,
      skills,
      illustrationALT,
      illustrationURL
    })
    setAlert({
      title: 'Success on create about page.',
      type: 'message'
    })
  }

  const update = async (event: React.FormEvent) => {
    event.preventDefault()

    aboutService.patch({
      title: title,
      description: description,
      skills,
      illustrationALT,
      illustrationURL
    })
    setAlert({ title: 'Success on update about page.', type: 'message' })
  }

  const onReset = () => {
    setTitle('')
    setDescription('')
    setSkills([])
    setIllustrationURL('')
    setIllustrationALT('')
    setTitleFocused(true)
  }

  const onChangeTags = (values: Tag[]) => {
    setSkills(values)
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Informações sobre você.'}>
        <FormContainer>
          <Styles.Form onReset={onReset} method="post" name="aboutPageForm">
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
              {isEmpty && (
                <Button styleType="primary" onClick={save}>
                  Salvar
                </Button>
              )}
              {!isEmpty && (
                <Button styleType="primary" onClick={update}>
                  Atualizar
                </Button>
              )}
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
