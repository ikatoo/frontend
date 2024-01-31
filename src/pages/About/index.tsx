import { useEffect, useState } from 'react'
import { useUser } from 'src/contexts/User/UserContext'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import CommonWrapper from 'src/styles/common/wrapper'
import { TextContainer } from '../../components/TextContainer'
import aboutService from '../../services/aboutService'
import Styles from './styles'

export const About = () => {
  const { user } = useUser()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  useEffect(() => {
    setPageSubtitle('About Page')

    const getInitialData = async () => {
      const initialData = (await aboutService.get())?.data
      initialData?.title && setTitle(initialData.title)
      initialData?.description && setDescription(initialData.description)
      initialData?.image?.url && setImageUrl(initialData.image.url)
      initialData?.image?.alt && setImageAlt(initialData.image.alt)
    }

    getInitialData()
  }, [user?.id])

  return (
    <CommonWrapper>
      <Styles.Text>
        {!!title && (
          <TextContainer title={title}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TextContainer>
        )}
      </Styles.Text>
      {imageUrl.length && (
        <Styles.ImageWrapper>
          <img src={imageUrl} alt={imageAlt} />
        </Styles.ImageWrapper>
      )}
    </CommonWrapper>
  )
}
