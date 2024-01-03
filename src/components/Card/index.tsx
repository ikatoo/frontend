import { Tag } from '../TagEditor'
import Styles from './styles'

export type CardProps = {
  image?: string
  title: string
  subTitle?: string
  content: string
  link?: string
  tags?: Tag[]
  users?:
    | {
        avatar: {
          url: string
          alt: string
        }
      }[]
    | undefined
}

const Card = ({
  image,
  title,
  subTitle,
  content,
  link,
  tags,
  users
}: CardProps) => {
  const Content = () => (
    <>
      {!!image && <Styles.Image src={image} alt={title} />}
      <Styles.BottomWrapper>
        <Styles.InfoWrapper>
          <Styles.Title>{title}</Styles.Title>
          <Styles.Description>
            <Styles.Subtitle>{subTitle}</Styles.Subtitle>
            <Styles.Content>{content}</Styles.Content>
          </Styles.Description>
        </Styles.InfoWrapper>

        {tags && (
          <Styles.Tags>
            {tags.map((tag, index) => (
              <Styles.Tag key={index}>{tag.title}</Styles.Tag>
            ))}
          </Styles.Tags>
        )}

        {!tags && !!users && (
          <Styles.Tags>
            {users.map((user, index) => (
              <Styles.Avatar
                key={index}
                src={user.avatar.url}
                alt={user.avatar.alt}
              />
            ))}
          </Styles.Tags>
        )}
      </Styles.BottomWrapper>
    </>
  )
  return (
    <Styles.Wrapper>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <Content />
        </a>
      ) : (
        <Content />
      )}
    </Styles.Wrapper>
  )
}

export default Card
