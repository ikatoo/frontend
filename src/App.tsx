import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider, RequireAuth } from 'react-auth-kit'
import Alert from './components/Alert'
import { AlertProvider } from './hooks/useAlert'
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

function App() {
  return (
    <AlertProvider>
      <Alert />
      <AuthProvider
        authName="_auth"
        authType="cookie"
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === 'https:'}
      >
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
                <RequireAuth loginPath="/signin">
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
      </AuthProvider>
    </AlertProvider>
  )
}

export default App
