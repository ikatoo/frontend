import { BrowserRouter } from 'react-router-dom'

import Alert from './components/Alert'
import { AlertProvider } from './hooks/useAlert'
import { AppRoutes } from './routes'

function App() {
  return (
    <AlertProvider>
      <Alert />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AlertProvider>
  )
}

export default App
