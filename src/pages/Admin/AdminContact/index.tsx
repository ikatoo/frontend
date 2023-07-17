import { useCallback, useEffect, useState } from 'react'

import Button from 'src/components/Button'
import { FormContainer } from 'src/components/FormContainer'
import Map from 'src/components/Map'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import { useAlert } from 'src/hooks/useAlert'
import contactService from 'src/services/contactService'
import { ContactPageProps } from 'src/types/ContactPage'
import { LocalizationType } from 'src/types/LocalizationType'
import Styles from './styles'

export const AdminContact = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [localization, setLocalization] = useState<LocalizationType>()
  const [email, setEmail] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [titleFocused, setTitleFocused] = useState(true)
  const [mapIsVisible, setMapIsVisible] = useState(false)
  const disabledButton =
    !title.length ||
    !description.length ||
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
    const getInitialData = async () => {
      const result = await contactService.get()
      if (result?.status !== 200 || !result.data) {
        updateLocalization()
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
  }, [updateLocalization])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!localization) return
    const data: ContactPageProps = {
      title,
      description,
      localization,
      email
    }
    const { status } = await contactService.create(data)
    if (status === 201) {
      setAlert({
        title: 'Success on create contact.',
        type: 'message'
      })
    }
    clearFields()
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

    clearFields()
    setEditMode(false)
  }

  const clearFields = (event?: React.FormEvent) => {
    !!event && event.preventDefault()

    setTitle('')
    setDescription('')
    setEmail('')
    setTitleFocused(true)
    updateLocalization()
  }

  const localizationClick = () => {
    setMapIsVisible(true)
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
              placeholder="Instrução breve e clara para uma comunicação eficiente com até 250 caracteres."
              maxLength={250}
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
              <div className="flex flex-col">
                <label className="text-xl cursor-pointer">Localization</label>
                <div
                  onClick={localizationClick}
                  className="bg-mck_primary text-mck_aqua rounded text-center h-12 flex flex-col items-center justify-center cursor-pointer"
                >
                  {localization ? (
                    <>
                      <span>{localization.lat}</span>
                      <span>{localization.lng}</span>
                    </>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.929 16.3785C3.119 16.9215 2 17.6715 2 18.5C2 20.157 6.477 21.5 12 21.5C17.523 21.5 22 20.157 22 18.5C22 17.6715 20.8805 16.9215 19.071 16.3785"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17.5C12 17.5 18.5 13.252 18.5 8.341C18.5 4.839 15.59 2 12 2C8.41 2 5.5 4.839 5.5 8.341C5.5 13.252 12 17.5 12 17.5Z"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11C12.663 11 13.2989 10.7366 13.7678 10.2678C14.2366 9.79893 14.5 9.16304 14.5 8.5C14.5 7.83696 14.2366 7.20107 13.7678 6.73223C13.2989 6.26339 12.663 6 12 6C11.337 6 10.7011 6.26339 10.2322 6.73223C9.76339 7.20107 9.5 7.83696 9.5 8.5C9.5 9.16304 9.76339 9.79893 10.2322 10.2678C10.7011 10.7366 11.337 11 12 11Z"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {mapIsVisible && (
                <div
                  onClick={(e) => {
                    e.preventDefault()
                    setMapIsVisible(false)
                  }}
                  className="inset-0 absolute flex items-center justify-center z-10 bg-black bg-opacity-50"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="rounded overflow-auto h-96 aspect-square"
                  >
                    <Map
                      center={localization}
                      markerTitle="Casa"
                      markerDescription={title}
                      whenClickOnTheMap={whenClickOnTheMap}
                    />
                  </div>
                </div>
              )}
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
