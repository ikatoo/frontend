import { useEffect, useState } from 'react'

import { useUser } from 'src/contexts/User/UserContext'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { AboutPageServiceProps } from 'src/types/AboutPage'
import Button from '../../../components/Button'
import { FormContainer } from '../../../components/FormContainer'
import TextArea from '../../../components/TextArea'
import { TextContainer } from '../../../components/TextContainer'
import TextInput from '../../../components/TextInput'
import { useAlert } from '../../../hooks/useAlert'
import aboutService from '../../../services/aboutService'
import Styles from './styles'

export const AdminAbout = () => {
  const { setAlert } = useAlert()
  const { user } = useUser()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageAlt, setImageAlt] = useState<string>('')
  const [initialData, setInitialData] = useState<AboutPageServiceProps>()
  const [titleFocused, setTitleFocused] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    setIsEmpty(!!(!initialData || !Object.keys(initialData).length))
  }, [initialData])

  useEffect(() => {
    setPageSubtitle('Edit About Page')

    const getInitialData = async () => {
      const result = await aboutService.get(user?.id ?? 1)
      setInitialData(result?.data)
    }
    getInitialData()
  }, [user?.id])

  useEffect(() => {
    initialData?.title && setTitle(initialData.title)
    initialData?.description && setDescription(initialData.description)
    initialData?.image.url && setImageUrl(initialData.image.url)
    initialData?.image.alt && setImageAlt(initialData.image.alt)
  }, [initialData])

  const save = async (event: React.FormEvent) => {
    event.preventDefault()

    aboutService.create({
      title,
      description,
      image: {
        url: imageUrl,
        alt: imageAlt
      }
    })
    setAlert({
      title: 'Success on create about page.',
      type: 'message'
    })
  }

  const update = async (event: React.FormEvent) => {
    event.preventDefault()

    aboutService.patch({
      title,
      description,
      image: {
        alt: imageAlt,
        url: imageUrl
      }
    })
    setAlert({ title: 'Success on update about page.', type: 'message' })
  }

  const onReset = () => {
    setTitle('')
    setDescription('')
    setImageAlt('')
    setImageUrl('')
    setTitleFocused(true)
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
              <Styles.FieldSet>
                <legend>Imagem</legend>
                <TextInput
                  initialValue={imageUrl}
                  labelColor="white"
                  label="URL"
                  name="illustrationURL"
                  placeholder="https://dominio.com/imagem.png"
                  onInputChange={(value) => setImageUrl(value)}
                />
                <TextInput
                  initialValue={imageAlt}
                  labelColor="white"
                  label="ALT"
                  name="illustrationALT"
                  placeholder="Descrição da imagem"
                  onInputChange={(value) => setImageAlt(value)}
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
