import { useEffect, useState } from 'react'
import Button from 'src/components/Button'
import Form, { Actions } from 'src/components/Form'
import { FormContainer } from 'src/components/FormContainer'
import TextArea from 'src/components/TextArea'
import TextInput from 'src/components/TextInput'
import TextWrapper from 'src/components/TextWrapper'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { useAlert } from 'src/hooks/useAlert'
import CommonWrapper from 'src/styles/common/wrapper'
import { LocalizationType } from 'src/types/LocalizationType'
import Map from '../../components/Map'
import { TextContainer } from '../../components/TextContainer'
import contactService from '../../services/contactService'
import Styles from './styles'

export const Contact = () => {
  const { setAlert } = useAlert()

  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [localization, setLocalization] = useState<LocalizationType>()
  const [focused, setFocused] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
    const emailValid = emailRegex.test(from)
    setDisabled(!emailValid || name === '' || from === '' || message === '')
  }, [from, message, name])

  useEffect(() => {
    setPageSubtitle('Contact Page')

    const getInitialData = async () => {
      const initialData = (await contactService.get())?.data
      initialData?.title && setTitle(initialData.title)
      initialData?.description && setDescription(initialData.description)
      initialData?.localization && setLocalization(initialData.localization)
    }

    getInitialData()
  }, [])

  const onReset = async (event: React.FormEvent) => {
    event.preventDefault()
    setName('')
    setFrom('')
    setMessage('')
    setFocused(true)
  }

  const onSendEmail = async (event: React.FormEvent) => {
    event.preventDefault()
    const { status, data } = await contactService.sendEmail({
      from,
      message: `
        <h1>De: ${name} - ${from}</h1>
        <h2>Mensagem</h2>
        <p>${message}</p>
        <h2>Localização</h2>
        <a target="_blank" href="https://www.openstreetmap.org/#map=8/${localization?.lat}/${localization?.lng}">
          https://www.openstreetmap.org/#map=8/${localization?.lat}/${localization?.lng}
        </a>
      `
    })
    if (status === 200) {
      setAlert({
        title: 'Email enviado com sucesso.',
        type: 'message'
      })
    } else {
      setAlert({
        title: data.error?.message,
        type: 'error'
      })
    }
  }

  return (
    <CommonWrapper>
      <Styles.Description>
        {
          <TextContainer title={title}>
            <div dangerouslySetInnerHTML={{ __html: description }} />

            <FormContainer>
              <Form onReset={onReset} method="post" name="contactPageForm">
                <TextWrapper>
                  <TextInput
                    focus={focused}
                    value={name}
                    onBlur={() => {
                      setFocused(false)
                    }}
                    onInputChange={setName}
                    labelColor="white"
                    label="Nome"
                    name="name"
                    placeholder="Seu Nome"
                    autoFocus={focused}
                  />
                </TextWrapper>

                <TextWrapper>
                  <TextInput
                    value={from}
                    onInputChange={setFrom}
                    labelColor="white"
                    label="Email"
                    name="email"
                    placeholder="seu@email.com"
                  />
                </TextWrapper>

                <TextWrapper>
                  <TextArea
                    value={message}
                    onTextAreaChange={setMessage}
                    label="Mensagem"
                    name="message"
                    placeholder="Escreva sua mensagem..."
                  />
                </TextWrapper>

                <Actions>
                  <Button
                    onClick={onSendEmail}
                    styleType="primary"
                    disabled={disabled}
                  >
                    Enviar
                  </Button>
                  <Button onClick={onReset} styleType="secondary" type="reset">
                    Limpar Formulário
                  </Button>
                </Actions>
              </Form>
            </FormContainer>
          </TextContainer>
        }
      </Styles.Description>

      {!!localization && (
        <Styles.AditionalContent>
          <Styles.MapWrapper data-testid="map-testid">
            <Map center={localization} whenClickOnTheMap={setLocalization} />
          </Styles.MapWrapper>
        </Styles.AditionalContent>
      )}
    </CommonWrapper>
  )
}
