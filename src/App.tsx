import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
import { Skills } from './pages/Skills'

function App() {
  return (
    <AlertProvider>
      <Alert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<About />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route
            path="/admin"
            element={
              // <RequireAuth>
              <PrivateLayout />
              // </RequireAuth>
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
