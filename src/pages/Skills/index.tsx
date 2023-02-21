import { useEffect, useState } from 'react'
import Card, { CardProps } from '../../components/Card'
import ProgressBar from '../../components/ProgressBar'
import { TextContainer } from '../../components/TextContainer'
import skillsService from '../../services/skillsService'
import { SkillsPageServiceType } from '../../types/SkillsPage'
import Styles from './styles'

export type SkillsProps = {
  title: string
  description: string
  skills: {
    skillTitle: string
    rankPercent: number
  }[]
  lastJobs: {
    yearMonthStart: string
    yearMonthEnd?: string
    jobTitle: string
    jobDescription: string
  }[]
}

export const Skills = () => {
  const [data, setData] = useState<SkillsPageServiceType>()

  useEffect(() => {
    const getData = async () => {
      const _data = await skillsService.get()
      !!_data && setData(_data)
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

      {!!(!!data?.skills?.length || !!data?.lastJobs?.length) && (
        <Styles.Skills>
          {!!data?.skills.length && (
            <Styles.Progress>
              <Styles.Subtitle>Estudo</Styles.Subtitle>
              {data?.skills.map(({ skillTitle, rankPercent }, index) => (
                <ProgressBar
                  key={index}
                  label={skillTitle}
                  percent={rankPercent}
                />
              ))}
            </Styles.Progress>
          )}

          {!!data?.lastJobs.length && (
            <Styles.JobsWrapper>
              <Styles.Subtitle>Últimos Trabalhos</Styles.Subtitle>
              <Styles.Jobs>
                {data?.lastJobs.map(
                  (
                    { jobTitle, jobDescription, yearMonthStart, yearMonthEnd },
                    index
                  ) => {
                    const content: CardProps = {
                      title: jobTitle,
                      subTitle: `${yearMonthStart} | ${yearMonthEnd || 'Hoje'}`,
                      content: jobDescription
                    }

                    return <Card stretch key={index} {...content} />
                  }
                )}
              </Styles.Jobs>
            </Styles.JobsWrapper>
          )}
        </Styles.Skills>
      )}
    </Styles.Wrapper>
  )
}
