import { Link } from 'react-router-dom'
import Styles from './styles'
import { useEffect } from 'react'
import setPageSubtitle from 'src/helpers/setPageSubtitle'

export const NotFound = () => {
  useEffect(() => {
    setPageSubtitle('NotFound Page')
  }, [])

  return (
    <Styles.Wrapper>
      <Styles.Code>404</Styles.Code>
      <Styles.Message>Page not found</Styles.Message>
      <Link to={'/'}>Go back to home.</Link>
    </Styles.Wrapper>
  )
}
