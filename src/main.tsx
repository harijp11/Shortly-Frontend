import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '@/slice/store.ts'
import App from './App.tsx'
import { ToastProvider } from '@/components/ui/toast.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
       <ToastProvider>
    <App />
    </ToastProvider>
    </Provider>
  </StrictMode>,
)
