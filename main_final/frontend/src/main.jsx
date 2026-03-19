import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/AuthContext'  // <-- add this line

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>            {/* <-- wrap your App with provider */}
    <App />
     </AuthProvider>
  </StrictMode>,
)
