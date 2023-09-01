import { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Logo from 'src/components/Logo'
import TextInput from 'src/components/TextInput'
import { useAlert } from 'src/hooks/useAlert'
import authService from 'src/services/authService'
import { EmailSchema } from 'src/types/Email'
import { HttpResponseSchema } from 'src/types/HttpResponse'
import Styles from './styles'
import setPageSubtitle from 'src/helpers/setPageSubtitle'

export const SignInPage = () => {
  const { setAlert } = useAlert()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string>()

  useEffect(() => {
    setPageSubtitle('Authentication')
  }, [])

  useEffect(() => {
    const validEmail = EmailSchema.safeParse(email)

    if (!!email.length && !validEmail.success) {
      setEmailError(validEmail.error.issues[0].message)
    } else {
      setEmailError(undefined)
    }
  }, [email])

  const handleSignIn = async (event: SyntheticEvent) => {
    event.preventDefault()
    const response = await authService.signIn({ email, password })
    const validResponse = HttpResponseSchema.safeParse(response)
    if (validResponse.success) {
      validResponse.data.status !== 200
        ? setAlert({
            type: 'error',
            title: validResponse.data.data.message
          })
        : (pathname !== '/signin' &&
            validResponse.data.status === 200 &&
            navigate(pathname)) ||
          navigate('/about')
    }
  }

  return (
    <Styles.Page>
      <form onSubmit={handleSignIn}>
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
            />
            <TextInput
              type="password"
              name="password"
              label="Senha"
              labelColor="white"
              onInputChange={setPassword}
            />
          </Styles.InputWrapper>

          <Styles.OptionsWrapper>
            <Link to={'/recovery'}>Recupere sua senha aqui.</Link>
            <Link to={'/signup'}>Não tem conta? Cadastre-se aqui.</Link>
          </Styles.OptionsWrapper>

          <Button
            disabled={!!emailError || !password.length || !email.length}
            type="submit"
            block
            styleType="primary"
          >
            ENTRAR
          </Button>

          <Styles.SocialLogin id="social-login">
            <Styles.Legend>Login com</Styles.Legend>
            <Button styleType="secondary" aria-label="Login com Google">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_660_851)">
                  <path
                    d="M8.70901 1.3593C6.21112 2.22584 4.05695 3.87056 2.5629 6.05188C1.06885 8.2332 0.313682 10.8361 0.408313 13.4784C0.502944 16.1206 1.44239 18.6629 3.08865 20.7317C4.73492 22.8006 7.00124 24.287 9.55471 24.9726C11.6249 25.5068 13.7938 25.5302 15.875 25.0409C17.7604 24.6174 19.5035 23.7116 20.9336 22.412C22.4221 21.0182 23.5024 19.245 24.0586 17.2831C24.6629 15.1496 24.7705 12.9061 24.3731 10.7245H12.7481V15.5468H19.4805C19.3459 16.3159 19.0576 17.05 18.6327 17.7051C18.2079 18.3602 17.6552 18.9228 17.0078 19.3593C16.1858 19.9033 15.2591 20.2692 14.2871 20.4335C13.3124 20.6148 12.3126 20.6148 11.3379 20.4335C10.3499 20.2295 9.41534 19.8217 8.59378 19.2363C7.27375 18.3019 6.2826 16.9744 5.76175 15.4433C5.23223 13.8835 5.23223 12.1925 5.76175 10.6327C6.1325 9.53941 6.74541 8.54394 7.55471 7.72063C8.48087 6.76115 9.65341 6.07531 10.9437 5.73836C12.234 5.4014 13.5921 5.42635 14.8692 5.81047C15.8668 6.11657 16.7791 6.65164 17.5332 7.37297C18.2923 6.61777 19.0502 5.8606 19.8067 5.10149C20.1973 4.69329 20.6231 4.30462 21.0078 3.88665C19.8565 2.81539 18.5052 1.98177 17.0313 1.43352C14.3471 0.458892 11.4101 0.4327 8.70901 1.3593Z"
                    fill="white"
                  />
                  <path
                    d="M8.70898 1.35931C11.4099 0.432073 14.3469 0.457576 17.0312 1.43157C18.5055 1.98355 19.8562 2.82118 21.0059 3.89642C20.6152 4.31438 20.2031 4.70501 19.8047 5.11126C19.0469 5.86777 18.2897 6.62168 17.5332 7.37298C16.7791 6.65165 15.8668 6.11658 14.8691 5.81048C13.5925 5.42501 12.2344 5.39862 10.9438 5.73419C9.65316 6.06977 8.47991 6.75435 7.55273 7.71282C6.74342 8.53613 6.13052 9.5316 5.75977 10.6249L1.71094 7.49016C3.16017 4.61626 5.66943 2.41795 8.70898 1.35931Z"
                    fill="#E33629"
                  />
                  <path
                    d="M0.636713 10.5956C0.854173 9.51706 1.21547 8.47257 1.71093 7.49016L5.75976 10.6327C5.23025 12.1925 5.23025 13.8835 5.75976 15.4433C4.4108 16.485 3.06119 17.5318 1.71093 18.5839C0.470992 16.1158 0.0928317 13.3036 0.636713 10.5956Z"
                    fill="#F8BD00"
                  />
                  <path
                    d="M12.7481 10.7226H24.3731C24.7705 12.9041 24.6629 15.1477 24.0586 17.2812C23.5024 19.243 22.422 21.0162 20.9336 22.4101C19.627 21.3905 18.3145 20.3788 17.0078 19.3593C17.6556 18.9223 18.2085 18.3591 18.6334 17.7033C19.0583 17.0475 19.3464 16.3127 19.4805 15.5429H12.7481C12.7461 13.9374 12.7481 12.33 12.7481 10.7226Z"
                    fill="#587DBD"
                  />
                  <path
                    d="M1.70898 18.5839C3.05924 17.5422 4.40885 16.4954 5.75781 15.4433C6.2797 16.9749 7.27228 18.3025 8.59375 19.2363C9.41787 19.819 10.3545 20.2234 11.3438 20.4238C12.3185 20.605 13.3183 20.605 14.293 20.4238C15.2649 20.2595 16.1917 19.8935 17.0137 19.3495C18.3203 20.3691 19.6328 21.3808 20.9395 22.4003C19.5096 23.7006 17.7664 24.6071 15.8809 25.0312C13.7996 25.5204 11.6307 25.497 9.56055 24.9628C7.92325 24.5256 6.3939 23.755 5.06836 22.6991C3.66548 21.5851 2.5196 20.1814 1.70898 18.5839Z"
                    fill="#319F43"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_660_851">
                    <rect
                      width="25"
                      height="25"
                      fill="white"
                      transform="translate(0 0.537033)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
            <Button styleType="secondary" aria-label="Login com Linkedin">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.1562 1.12297H2.84375C2.38287 1.11828 1.93896 1.29661 1.60941 1.61883C1.27986 1.94106 1.0916 2.38085 1.08594 2.84172V23.2363C1.09263 23.6964 1.28134 24.1352 1.61078 24.4566C1.94021 24.778 2.38354 24.9558 2.84375 24.9511H23.1562C23.6172 24.9547 24.0608 24.7758 24.3901 24.4534C24.7195 24.131 24.9079 23.6913 24.9141 23.2304V2.83586C24.9058 2.37635 24.7166 1.93865 24.3874 1.6179C24.0583 1.29716 23.6158 1.11929 23.1562 1.12297Z"
                  fill="#0076B2"
                />
                <path
                  d="M4.61328 10.0546H8.15039V21.4355H4.61328V10.0546ZM6.38281 4.39055C6.7885 4.39055 7.18508 4.51087 7.52237 4.7363C7.85966 4.96173 8.12251 5.28214 8.27767 5.65698C8.43284 6.03183 8.47333 6.44427 8.39404 6.84214C8.31476 7.24 8.11924 7.60541 7.83224 7.89214C7.54524 8.17887 7.17964 8.37403 6.7817 8.45294C6.38376 8.53185 5.97136 8.49096 5.59666 8.33544C5.22196 8.17992 4.90181 7.91677 4.6767 7.57926C4.45159 7.24176 4.33165 6.84507 4.33203 6.43938C4.33255 5.89581 4.54884 5.37469 4.93338 4.99052C5.31792 4.60634 5.83925 4.39055 6.38281 4.39055ZM10.3691 10.0546H13.7598V11.6171H13.8066C14.2793 10.7226 15.4316 9.77922 17.1523 9.77922C20.7344 9.77141 21.3984 12.1288 21.3984 15.1855V21.4355H17.8613V15.8984C17.8613 14.58 17.8379 12.8827 16.0234 12.8827C14.209 12.8827 13.9004 14.3202 13.9004 15.8124V21.4355H10.3691V10.0546Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button styleType="secondary" aria-label="Login via email">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 4.03703H4.5C3.4 4.03703 2.51 4.93703 2.51 6.03703L2.5 18.037C2.5 19.137 3.4 20.037 4.5 20.037H20.5C21.6 20.037 22.5 19.137 22.5 18.037V6.03703C22.5 4.93703 21.6 4.03703 20.5 4.03703ZM20.5 8.03703L12.5 13.037L4.5 8.03703V6.03703L12.5 11.037L20.5 6.03703V8.03703Z"
                  fill="#E5E7EB"
                />
              </svg>
            </Button>
          </Styles.SocialLogin>
        </Styles.Container>
      </form>
    </Styles.Page>
  )
}