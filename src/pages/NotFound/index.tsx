import { Meh } from '@styled-icons/boxicons-regular'
import { Link } from 'react-router-dom'
import Styles from './styles'

export const NotFound = () => (
  <Styles.Wrapper>
    <Styles.Code>404</Styles.Code>
    <Styles.Message>Page not found</Styles.Message>
    <Styles.ImageWrapper>
      <Meh />
    </Styles.ImageWrapper>
    <Styles.Message>
      <Link to="/">Return to Home</Link>
    </Styles.Message>
  </Styles.Wrapper>
)
