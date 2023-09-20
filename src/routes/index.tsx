import { Route, Routes } from 'react-router-dom'
import { About } from 'src/pages/About'
import { AdminAbout } from 'src/pages/Admin/AdminAbout'
import { AdminContact } from 'src/pages/Admin/AdminContact'
import { AdminProjects } from 'src/pages/Admin/AdminProjects'
import { AdminSkills } from 'src/pages/Admin/AdminSkills'
import { Contact } from 'src/pages/Contact'
import { PrivateLayout } from 'src/pages/Layouts/PrivateLayout'
import { PublicLayout } from 'src/pages/Layouts/PublicLayout'
import { NotFound } from 'src/pages/NotFound'
import { Projects } from 'src/pages/Projects'
import { RecoveryPage } from 'src/pages/Recovery'
import { SignInPage } from 'src/pages/SignIn'
import { SignUpPage } from 'src/pages/SignUp'
import { Skills } from 'src/pages/Skills'
import { Private } from './Private'

export const AppRoutes = () => (
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
        <Private>
          <PrivateLayout />
        </Private>
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
)
