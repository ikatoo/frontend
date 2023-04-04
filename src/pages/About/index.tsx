import { useEffect, useState } from 'react'
import IconCloud from '../../components/IconCloud'
import { TextContainer } from '../../components/TextContainer'
import aboutService from '../../services/aboutService'
import Styles from './styles'
import { AboutPageServiceType } from '../../types/AboutPage'

export const About = () => {
  const [data, setData] = useState<AboutPageServiceType>()

  useEffect(() => {
    const getData = async () => {
      const result = await aboutService.get()
      setData(result?.data)
    }
    getData()
  }, [])

  return (
    <Styles.Wrapper>
      <Styles.Text>
        {!!data?.title && (
          <TextContainer title={data?.title}>
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </TextContainer>
        )}
      </Styles.Text>

      {data?.skills.length ? (
        <Styles.Skills>
          <IconCloud slugs={data.skills.map((skill) => skill.title)} />
        </Styles.Skills>
      ) : (
        !!data?.illustrationURL && (
          <Styles.ImageWrapper>
            <img
              src={data?.illustrationURL}
              alt={data?.illustrationALT ?? ''}
            />
          </Styles.ImageWrapper>
        )
      )}
    </Styles.Wrapper>
  )
}
