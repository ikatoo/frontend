import { useEffect, useState } from 'react'

import Button from '../../../components/Button'
import { FormContainer } from '../../../components/FormContainer'
import { TextContainer } from '../../../components/TextContainer'
import TextInput from '../../../components/TextInput'
// import { useAlert } from '../../../hooks/useAlert'
// import aboutService from '../../../services/aboutService'
import TagEditor, { Tag } from '../../../components/TagEditor'
import TextArea from '../../../components/TextArea'
import Styles from './styles'

export const AdminAbout = () => {
  const auth = { user: { id: '' } }
  // const { setAlert } = useAlert()

  // const [id, setId] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [skills] = useState<Tag[]>([])
  const [illustrationURL, setIllustrationURL] = useState('')
  const [illustrationALT, setIllustrationALT] = useState('')

  useEffect(() => {
    // const getInitialData = async () => {
    //   if (auth.user?.id) {
    //     const initialData = await aboutService.get(auth.user?.id ?? '')
    //     if (initialData) {
    //       setId(initialData.id)
    //       setTitle(initialData.title)
    //       setDescription(initialData.description)
    //     }
    //   }
    // }
    // getInitialData()
  }, [auth.user?.id])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // if (!id) {
    //   aboutService.create({
    //     title: title,
    //     description: description,
    //     user_id: auth.user?.id
    //   })
    //   setAlert({
    //     title: 'Success on create about page.',
    //     type: 'message'
    //   })
    // } else {
    //   aboutService.update({
    //     id: id,
    //     title: title,
    //     description: description,
    //     user_id: auth.user?.id
    //   })
    //   setAlert({ title: 'Success on update about page.', type: 'message' })
    // }
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
                  autoFocus
                />
                <TextInput
                  name="illustrationALT"
                  placeholder="short image description"
                  label="Imagem ALT"
                  labelColor="white"
                  initialValue={illustrationALT}
                  onInputChange={(value) => setIllustrationALT(value)}
                  autoFocus
                />
              </Styles.FieldSet>
            </Styles.TextWrapper>

            <Styles.Actions>
              <Button tabIndex={3} styleType="primary">
                Salvar
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
