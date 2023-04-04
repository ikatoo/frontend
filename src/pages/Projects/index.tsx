import Card, { CardProps } from '../../components/Card'
import projectsMock from '../../mocks/projectsMock'
import Styles from './styles'

export type ProjectProps = {
  snapshot: string
  description: CardProps
  githubLink?: string
}

export const Projects = () => {
  const projects = projectsMock

  type LinkMatcherProps = {
    githubLink?: string
    children: JSX.Element
  }

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
