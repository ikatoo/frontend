import { useEffect, useState } from 'react'
import Map, { LocalizationType } from '../../components/Map'
import { TextContainer } from '../../components/TextContainer'
import Styles from './styles'
import contactService from '../../services/contactService'

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
          <Map
            center={localization}
            label={{
              text: 'Milton Carlos Katoo',
              className: '-mt-10 bg-slate-700 p-1 rounded',
              color: 'white'
            }}
          />
        </div>
      )}
    </Styles.Wrapper>
  )
}
