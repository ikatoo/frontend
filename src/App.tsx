import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'

import { useEffect, useState } from 'react'
import Alert from './components/Alert'
import { AlertProvider, useAlert } from './hooks/useAlert'
import { About } from './pages/About'
import { AdminAbout } from './pages/Admin/AdminAbout'
import { AdminContact } from './pages/Admin/AdminContact'
import { AdminProjects } from './pages/Admin/AdminProjects'
import { AdminSkills } from './pages/Admin/AdminSkills'
import { Contact } from './pages/Contact'
import { PrivateLayout } from './pages/Layouts/PrivateLayout'
import { PublicLayout } from './pages/Layouts/PublicLayout'
import { NotFound } from './pages/NotFound'
import { Projects } from './pages/Projects'
import { RecoveryPage } from './pages/Recovery'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'
import { Skills } from './pages/Skills'
import authService from './services/authService'
import { HttpResponseSchema } from './types/HttpResponse'
import Loading from './components/Loading'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { setAlert } = useAlert()
  const { pathname } = useLocation()

  const [authorized, setAuthorized] = useState<boolean>()

  useEffect(() => {
    const verify = async () => {
      const result = await authService.verifyToken()

      const validateResponse = HttpResponseSchema.safeParse(result)

      if (!validateResponse.success) {
        setAlert({
          type: 'error',
          title: 'Unknown error on server'
        })
        return
      }

      const { data, status } = validateResponse.data
      const isAuthorized = status !== 401
      !isAuthorized &&
        setAlert({
          type: 'error',
          title: !!data && 'message' in data && data.message
        })
      setAuthorized(isAuthorized)
    }
    verify()
  }, [setAlert])

  // if (authorized === undefined) return <div>loading...</div>
  if (authorized === undefined) return <Loading />

  if (authorized) {
    return children
  }

  const target = pathname === '/signin' ? '/' : pathname
  return <Navigate to="/signin" state={{ redirectTo: target }} />
}

function App() {
  return (
    <AlertProvider>
      <Alert />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/" element={<PublicLayout />}>
            <Route index path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <PrivateLayout />
              </RequireAuth>
            }
          >
            <Route index element={<AdminAbout />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  )
}

export default App
