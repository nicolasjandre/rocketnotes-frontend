import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './Routes'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import { AuthProvider } from './hooks/auth'

import theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
