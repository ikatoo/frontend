import { useEffect, useState } from 'react'
import Map from '../../components/Map'
import { TextContainer } from '../../components/TextContainer'
import contactService from '../../services/contactService'
import Styles from './styles'
import { LocalizationType } from 'src/types/LocalizationType'

export const Contact = () => {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [localization, setLocalization] = useState<LocalizationType>()

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = (await contactService.get())?.data
      initialData?.title && setTitle(initialData.title)
      initialData?.description && setDescription(initialData.description)
      initialData?.localization && setLocalization(initialData.localization)
    }

    getInitialData()
  }, [])

  return (
    <Styles.Wrapper>
      <Styles.Description>
        {
          <TextContainer title={title}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TextContainer>
        }
      </Styles.Description>

      {!!localization && (
        <div data-testid="google-maps">
          <Map center={localization} />
        </div>
      )}
    </Styles.Wrapper>
  )
}
