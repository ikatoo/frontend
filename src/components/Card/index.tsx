import Styles from './styles'

export type CardProps = {
  image?: string
  title: string
  subTitle?: string
  content: string
  link?: string
  stretch?: boolean
}

const Card = ({
  stretch = false,
  image,
  title,
  subTitle,
  content,
  link
}: CardProps) => {
  const Content = () => (
    <>
      {!!image && <Styles.Image src={image} alt={title} />}
      <Styles.ContentWrapper>
        <Styles.Title>{title}</Styles.Title>
        <Styles.Subtitle>{subTitle}</Styles.Subtitle>
        <Styles.Content>{content}</Styles.Content>
      </Styles.ContentWrapper>
    </>
  )
  return (
    <Styles.Wrapper $stretch={stretch}>
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
