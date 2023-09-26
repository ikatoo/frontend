import { useEffect, useState } from 'react'
import IconCloud from '../../components/IconCloud'
import { TextContainer } from '../../components/TextContainer'
import aboutService from '../../services/aboutService'
import Styles from './styles'
import setPageSubtitle from 'src/helpers/setPageSubtitle'

type Skill = {
  title: string
}

export const About = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    setPageSubtitle('About Page')

    const getInitialData = async () => {
      const initialData = (await aboutService.get())?.data
      initialData?.title && setTitle(initialData.title)
      initialData?.description && setDescription(initialData.description)
      initialData?.skills && setSkills(initialData.skills)
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

      {skills.length && (
        <Styles.Skills>
          <IconCloud slugs={skills.map((skill) => skill.title)} />
        </Styles.Skills>
      )}
    </Styles.Wrapper>
  )
}
