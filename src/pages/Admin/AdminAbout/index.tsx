import { useEffect, useState } from 'react'

import Button from '../../../components/Button'
import TextEditor from '../../../components/TextEditor'
import { FormContainer } from '../../../components/FormContainer'
import { TextContainer } from '../../../components/TextContainer'
import TextInput from '../../../components/TextInput'
// import { useAlert } from '../../../hooks/useAlert'
// import aboutService from '../../../services/aboutService'
import Styles from './styles'

export const AdminAbout = () => {
  const auth = { user: { id: '' } }
  // const { setAlert } = useAlert()

  // const [id, setId] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()

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
                onBlur={(event) => setTitle(event.currentTarget.value)}
                tabIndex={1}
                autoFocus
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextEditor
                initialValue={description}
                label="Descrição"
                labelColor="white"
                onChange={(value) => setDescription(value)}
                tabIndex={2}
              />
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
