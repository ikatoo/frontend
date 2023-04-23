import { useEffect, useState } from 'react'

import Button from '../../../components/Button'
import { FormContainer } from '../../../components/FormContainer'
import TagEditor, { Tag } from '../../../components/TagEditor'
import TextArea from '../../../components/TextArea'
import { TextContainer } from '../../../components/TextContainer'
import TextInput from '../../../components/TextInput'
import { useAlert } from '../../../hooks/useAlert'
import aboutService from '../../../services/aboutService'
import Styles from './styles'

export const AdminAbout = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [skills, setSkills] = useState<Tag[]>([])
  const [illustrationURL, setIllustrationURL] = useState('')
  const [illustrationALT, setIllustrationALT] = useState('')

  useEffect(() => {
    const getInitialData = async () => {
      const result = await aboutService.get()
      const initialData = result?.data
      if (initialData) {
        setTitle(initialData.title)
        setDescription(initialData.description)
        setSkills(initialData.skills)
        initialData.illustrationALT &&
          setIllustrationALT(initialData.illustrationALT)
        initialData.illustrationURL &&
          setIllustrationURL(initialData.illustrationURL)
      }
    }
    getInitialData()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!title.length) {
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
    } else {
      aboutService.patch({
        title: title,
        description: description,
        skills,
        illustrationALT,
        illustrationURL
      })
      setAlert({ title: 'Success on update about page.', type: 'message' })
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
                onInputChange={(value) => setTitle(value)}
                autoFocus
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
              <Button styleType="primary">Salvar</Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
