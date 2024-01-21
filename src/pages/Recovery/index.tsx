import { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Logo from 'src/components/Logo'
import TextInput from 'src/components/TextInput'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { useAlert } from 'src/hooks/useAlert'
import usersService from 'src/services/usersService'
import { EmailSchema } from 'src/types/Email'
import { HttpResponseSchema } from 'src/types/HttpResponse'
import Styles from './styles'

export const RecoveryPage = () => {
  const navigate = useNavigate()
  const { setAlert } = useAlert()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string>()
  const [enabledSubmit, setEnabledSubmit] = useState(false)

  useEffect(() => {
    setPageSubtitle('Recovery Page')
  }, [])

  useEffect(() => {
    const validEmail = EmailSchema.safeParse(email)

    if (!!email.length && !validEmail.success) {
      setEmailError(validEmail.error.issues[0].message)
    } else {
      setEmailError(undefined)
    }
  }, [email])

  useEffect(() => {
    setEnabledSubmit(!!email.length && !emailError)
  }, [email.length, emailError])

  const handleRecovery = async (event: SyntheticEvent) => {
    event.preventDefault()

    if (!enabledSubmit) return

    const response = await usersService.recoveryPassword(email)
    const validResponse = HttpResponseSchema.safeParse(response)
    if (validResponse.success && validResponse.data.status === 200) {
      setAlert({
        type: 'message',
        title: 'Email enviado com sucesso.'
      })
      navigate('/signin')
    } else {
      setAlert({
        type: 'error',
        title: validResponse.success
          ? validResponse.data.error?.message
          : validResponse.error.issues[0].message
      })
    }
  }

  return (
    <Styles.Page>
      <form onSubmit={handleRecovery}>
        <Styles.Container>
          <Styles.LogoWrapper>
            <Logo name="Milton Carlos Katoo" description="Software Developer" />
          </Styles.LogoWrapper>

          <Styles.InputWrapper>
            <TextInput
              name="email"
              label="E-mail"
              labelColor="white"
              onInputChange={setEmail}
              error={emailError}
              autoFocus
            />
          </Styles.InputWrapper>

          {/* <Link to={'/signup'}>Não tem conta? Cadastre-se aqui.</Link> */}

          <Button
            disabled={!enabledSubmit}
            type="submit"
            block
            styleType="primary"
          >
            RECUPERAR SENHA
          </Button>
        </Styles.Container>
      </form>
    </Styles.Page>
  )
}
