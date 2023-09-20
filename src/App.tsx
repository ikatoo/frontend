import { BrowserRouter } from 'react-router-dom'

import Alert from './components/Alert'
import { AlertProvider } from './hooks/useAlert'
import { AppRoutes } from './routes'
import { UserProvider } from './contexts/User/UserProvider'

function App() {
  return (
    <AlertProvider>
      <Alert />
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </AlertProvider>
  )
}

export default App
