import { useCallback, useEffect, useState } from 'react'

import Button from 'src/components/Button'
import { FormContainer } from 'src/components/FormContainer'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import { useAlert } from 'src/hooks/useAlert'
import contactService from 'src/services/contactService'
import { ContactPageProps } from 'src/types/ContactPage'
import { LocalizationType } from 'src/types/LocalizationType'
import Localization from './Localization'
import Styles from './styles'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { useUser } from 'src/contexts/User/UserContext'

export const AdminContact = () => {
  const { setAlert } = useAlert()
  const { user } = useUser()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [localization, setLocalization] = useState<LocalizationType>()
  const [email, setEmail] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [titleFocused, setTitleFocused] = useState(true)
  const disabledButton =
    !title?.length ||
    !description?.length ||
    !localization?.lat ||
    !localization.lng

  const updateLocalization = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalization({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => setAlert({ title: error.message, type: 'error' }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    } else {
      setAlert({ title: 'Geolocalização não suportada.', type: 'error' })
    }
  }, [setAlert])

  useEffect(() => {
    updateLocalization()
  }, [updateLocalization])

  useEffect(() => {
    setPageSubtitle('Edit Contact Page')

    const getInitialData = async () => {
      const result = await contactService.get()
      if (result?.status !== 200 || !result.data) {
        setEditMode(false)
        return
      }

      setEditMode(true)
      const contact = result.data
      setTitle(contact.title)
      setDescription(contact.description)
      setEmail(contact.email)
      setLocalization(contact.localization)
    }
    getInitialData()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!localization || !user?.id) return
    const data = {
      title,
      description,
      email,
      localization,
      userId: user.id
    }
    console.log('data ===>', data)
    const { status } = await contactService.create(data)
    if (status === 201) {
      setAlert({
        title: 'Success on create contact.',
        type: 'message'
      })
    }
  }

  const updateContact = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!localization) return
    const data: ContactPageProps = {
      title,
      description,
      email,
      localization
    }

    const { status } = await contactService.patch(data)
    if (status === 204) {
      setAlert({
        title: 'Success on update contact.',
        type: 'message'
      })
    }
  }

  const clearFields = (event?: React.FormEvent) => {
    !!event && event.preventDefault()

    setTitle('')
    setDescription('')
    setEmail('')
    setTitleFocused(true)
    updateLocalization()
  }

  const whenClickOnTheMap = (position: LocalizationType) => {
    setLocalization(position)
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Dados da sua página de contato.'}>
        <FormContainer>
          <Styles.Form name="contactsPageForm">
            <TextInput
              name="title"
              placeholder="Título da página"
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

            <TextInput
              name="description"
              placeholder="Instrução breve e clara para uma comunicação eficiente com até 350 caracteres."
              maxLength={350}
              label="Breve Descrição"
              labelColor="white"
              initialValue={description}
              onInputChange={setDescription}
            />

            <Styles.Fill>
              <TextInput
                name="email"
                placeholder="Ex: seuemail@provedor.com.br"
                label="Email"
                labelColor="white"
                initialValue={email}
                onInputChange={setEmail}
              />
              <Localization
                initialValue={localization}
                whenClickOnTheMap={whenClickOnTheMap}
                markerTitle="Casa"
                markerDescription={title}
              />
            </Styles.Fill>

            <Styles.Actions>
              {!editMode ? (
                <Button
                  onClick={handleSubmit}
                  styleType="primary"
                  disabled={disabledButton}
                >
                  Salvar
                </Button>
              ) : (
                <Button
                  onClick={updateContact}
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
      </TextContainer>
    </Styles.Wrapper>
  )
}
