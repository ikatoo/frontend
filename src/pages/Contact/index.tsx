import { useEffect, useState } from 'react'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import CommonWrapper from 'src/styles/common/wrapper'
import { LocalizationType } from 'src/types/LocalizationType'
import Map from '../../components/Map'
import { TextContainer } from '../../components/TextContainer'
import contactService from '../../services/contactService'
import Styles from './styles'

export const Contact = () => {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [localization, setLocalization] = useState<LocalizationType>()

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

  return (
    <CommonWrapper>
      <Styles.Description>
        {
          <TextContainer title={title}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TextContainer>
        }
      </Styles.Description>

      {!!localization && (
        <div
          className="rounded overflow-auto w-full aspect-square"
          data-testid="map-testid"
        >
          <Map center={localization} />
        </div>
      )}
    </CommonWrapper>
  )
}
