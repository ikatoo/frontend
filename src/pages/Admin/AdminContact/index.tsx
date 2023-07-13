import { useEffect, useState } from 'react'

import Button from 'src/components/Button'
import { FormContainer } from 'src/components/FormContainer'
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
  const [localization, setLocalization] = useState<LocalizationType>({
    lat: 0,
    lng: 0
  })
  const [email, setEmail] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [titleFocused, setTitleFocused] = useState(true)
  const disabledButton =
    !title.length ||
    !description.length ||
    !localization?.lat ||
    !localization.lng

  useEffect(() => {
    const getInitialData = async () => {
      const result = await contactService.get()
      if (result?.status !== 200 || !result.data) return
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
    // setLocalization()
    setTitleFocused(true)
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
              <div className="self-end">
                <label htmlFor="">Localization</label>
                <div className="flex flex-row gap-2">
                  <TextInput
                    name="lat"
                    placeholder="00.000000000000000"
                    initialValue={`${localization?.lat}`}
                    onInputChange={(lat) => {
                      !!localization &&
                        setLocalization({
                          lat: parseFloat(lat),
                          lng: localization.lng
                        })
                    }}
                  />
                  <TextInput
                    name="lng"
                    placeholder="00.000000000000000"
                    initialValue={`${localization?.lng}`}
                    onInputChange={(lng) => {
                      !!localization &&
                        setLocalization({
                          lat: localization.lat,
                          lng: parseFloat(lng)
                        })
                    }}
                  />
                </div>
              </div>
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
