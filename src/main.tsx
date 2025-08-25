import { StrictMode } from 'react'
import {Provider as ReduxProvider} from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.ts'
import { ThemeProvider } from './providers/theme.provider.tsx'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
      <Toaster position='top-center'/>
    </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
