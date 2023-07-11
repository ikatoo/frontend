import { useEffect, useState } from 'react'
import Card, { CardProps } from '../../components/Card'
import Styles from './styles'
import projectsService from '../../services/projectsService'

export type ProjectProps = {
  id?: number
  snapshot: string
  description: CardProps
  githubLink?: string
}

type LinkMatcherProps = {
  githubLink?: string
  children: JSX.Element
}

export const Projects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([])

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = (await projectsService.get())?.data
      !!initialData && setProjects(initialData)
    }

    getInitialData()
  }, [])

  const LinkMatcher = ({ githubLink, children }: LinkMatcherProps) =>
    !githubLink ? <div>{children}</div> : <a href={githubLink}>{children}</a>

  return (
    <Styles.Wrapper>
      {projects.map(({ description, snapshot, githubLink }, index) => (
        <Styles.CardWrapper key={index}>
          <LinkMatcher githubLink={githubLink}>
            <Card stretch image={snapshot} {...description} />
          </LinkMatcher>
        </Styles.CardWrapper>
      ))}
    </Styles.Wrapper>
  )
}
