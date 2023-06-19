import { Link } from 'react-router-dom'
import Styles from './styles'

export const NotFound = () => (
  <Styles.Wrapper>
    <Styles.Code>404</Styles.Code>
    <Styles.Message>Page not found</Styles.Message>
    <Link to={'/'}>Go back to home.</Link>
  </Styles.Wrapper>
)
