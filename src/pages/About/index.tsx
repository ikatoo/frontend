import { useEffect, useState } from 'react'
import IconCloud from '../../components/IconCloud'
import { TextContainer } from '../../components/TextContainer'
import aboutService from '../../services/aboutService'
import Styles from './styles'

type Skill = {
  title: string
}

export const About = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<Skill[]>([])
  const [illustrationURL, setIllustrationURL] = useState('')
  const [illustrationALT, setIllustrationALT] = useState('')

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = (await aboutService.get())?.data
      initialData?.title && setTitle(initialData.title)
      initialData?.description && setDescription(initialData.description)
      initialData?.skills && setSkills(initialData.skills)
      initialData?.illustrationURL &&
        setIllustrationURL(initialData.illustrationURL)
      initialData?.illustrationALT &&
        setIllustrationALT(initialData.illustrationALT)
    }

    getInitialData()
  }, [])

  return (
    <Styles.Wrapper>
      <Styles.Text>
        {!!title && (
          <TextContainer title={title}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TextContainer>
        )}
      </Styles.Text>

      {skills.length ? (
        <Styles.Skills>
          <IconCloud slugs={skills.map((skill) => skill.title)} />
        </Styles.Skills>
      ) : (
        !!illustrationURL?.length && (
          <Styles.ImageWrapper>
            <img src={illustrationURL} alt={illustrationALT ?? ''} />
          </Styles.ImageWrapper>
        )
      )}
    </Styles.Wrapper>
  )
}
