import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'

import { useEffect } from 'react'
import Alert from './components/Alert'
import Loading from './components/Loading'
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
import { useAuthStore } from './store/useAuthStore'

function RequireAuth({ children }: { children: JSX.Element }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { setAlert } = useAlert()

  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const verifyToken = useAuthStore((state) => state.verifyToken)

  const target = pathname === '/signin' ? '/' : pathname

  useEffect(() => {
    const verify = async () => {
      const result = await verifyToken()
      if (!result || !Object.keys(result).length || result.error) {
        setAlert({
          type: 'error',
          title: result.error
        })
        navigate('/signin', { state: { redirectTo: target } })
        return
      }
    }
    verify()
  }, [navigate, setAlert, target, verifyToken])

  if (!loading && !user) {
    return <Navigate to="/signin" state={{ redirectTo: target }} />
  }

  if (!loading && user) {
    return children
  }

  return <Loading />
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
