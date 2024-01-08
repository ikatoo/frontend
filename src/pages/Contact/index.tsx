import { useEffect, useState } from 'react'
import Form from 'src/components/Form'
import { FormContainer } from 'src/components/FormContainer'
import TextInput from 'src/components/TextInput'
import TextWrapper from 'src/components/TextWrapper'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import CommonWrapper from 'src/styles/common/wrapper'
import { LocalizationType } from 'src/types/LocalizationType'
import Map from '../../components/Map'
import { TextContainer } from '../../components/TextContainer'
import contactService from '../../services/contactService'
import Styles from './styles'
import TextArea from 'src/components/TextArea'

export const Contact = () => {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [localization, setLocalization] = useState<LocalizationType>()
  const [focused, setFocused] = useState(true)

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

  const onReset = () => {
    setFocused(true)
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
                    onBlur={() => {
                      setFocused(false)
                    }}
                    labelColor="white"
                    label="Nome"
                    name="name"
                    placeholder="Seu Nome"
                    autoFocus={focused}
                  />
                </TextWrapper>

                <TextWrapper>
                  <TextInput
                    labelColor="white"
                    label="Email"
                    name="email"
                    placeholder="seu@email.com"
                  />
                </TextWrapper>

                <TextWrapper>
                  <TextArea
                    label="Mensagem"
                    name="message"
                    placeholder="Escreva sua mensagem..."
                  />
                </TextWrapper>
              </Form>
            </FormContainer>
          </TextContainer>
        }
      </Styles.Description>

      {!!localization && (
        <Styles.AditionalContent>
          <Styles.MapWrapper data-testid="map-testid">
            <Map center={localization} />
          </Styles.MapWrapper>
        </Styles.AditionalContent>
      )}
    </CommonWrapper>
  )
}
