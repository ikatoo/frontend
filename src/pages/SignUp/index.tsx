import { SyntheticEvent, useEffect, useState } from 'react'
import { Link, redirect, useLocation } from 'react-router-dom'
import Button from 'src/components/Button'
import Logo from 'src/components/Logo'
import TextInput from 'src/components/TextInput'
import { useAlert } from 'src/hooks/useAlert'
import usersService from 'src/services/usersService'
import { EmailSchema } from 'src/types/Email'
import { HttpResponseSchema } from 'src/types/HttpResponse'
import Styles from './styles'

export const SignUpPage = () => {
  const { setAlert } = useAlert()
  const { pathname } = useLocation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string>()
  const [emailError, setEmailError] = useState<string>()
  const [enabledSubmit, setEnabledSubmit] = useState(false)

  useEffect(() => {
    const validEmail = EmailSchema.safeParse(email)

    if (!!email.length && !validEmail.success) {
      setEmailError(validEmail.error.issues[0].message)
    } else {
      setEmailError(undefined)
    }
  }, [email])

  useEffect(() => {
    setEnabledSubmit(
      !passwordError &&
        !!name.length &&
        !!email.length &&
        !!password.length &&
        !emailError
    )
  }, [email.length, emailError, name.length, password.length, passwordError])

  useEffect(() => {
    if (password === confirmPassword) return setPasswordError(undefined)
    setPasswordError('Password and confirmation have to be equal.')
  }, [confirmPassword, password])

  const handleSignUp = async (event: SyntheticEvent) => {
    event.preventDefault()

    if (enabledSubmit) return

    const response = await usersService.create({ name, email, password })
    const validResponse = HttpResponseSchema.safeParse(response)
    if (validResponse.success) {
      validResponse.data.status !== 200
        ? setAlert({
            type: 'error',
            title: validResponse.data.data.message
          })
        : pathname !== '/signin' &&
          validResponse.data.status === 200 &&
          redirect(pathname)
    }
  }

  return (
    <Styles.Page>
      <form onSubmit={handleSignUp}>
        <Styles.Container>
          <Styles.LogoWrapper>
            <Logo name="Milton Carlos Katoo" description="Software Developer" />
          </Styles.LogoWrapper>

          <Styles.InputWrapper>
            <TextInput
              name="name"
              label="Nome"
              labelColor="white"
              onInputChange={setName}
            />
            <TextInput
              name="email"
              label="E-mail"
              labelColor="white"
              onInputChange={setEmail}
              error={emailError}
            />
            <TextInput
              name="password"
              label="Senha"
              labelColor="white"
              onInputChange={setPassword}
              error={passwordError}
            />
            <TextInput
              name="confirm-password"
              label="Confirmar Senha"
              labelColor="white"
              onInputChange={setConfirmPassword}
              error={passwordError}
            />
          </Styles.InputWrapper>

          <Styles.OptionsWrapper>
            <Link to={'/recovery'}>Recupere sua senha aqui.</Link>
            <Link to={'/signin'}>Voltar a tela de login.</Link>
          </Styles.OptionsWrapper>

          <Button
            disabled={!enabledSubmit}
            type="submit"
            block
            styleType="primary"
          >
            ENTRAR
          </Button>
        </Styles.Container>
      </form>
    </Styles.Page>
  )
}
