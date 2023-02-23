import { Meh } from '@styled-icons/boxicons-regular'
import Styles from './styles'

export const NotFound = () => (
  <Styles.Wrapper>
    <Styles.Code>404</Styles.Code>
    <Styles.Message>Page not found</Styles.Message>
    <Styles.Image>
      <Meh />
    </Styles.Image>
  </Styles.Wrapper>
)
