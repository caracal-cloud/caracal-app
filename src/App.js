/** @jsx jsx */
import { jsx, Styled, ThemeProvider } from 'theme-ui'
import { Router, Redirect } from '@reach/router'

import theme from 'Theme'
import { ProtectedRoute, AuthProvider } from 'Modules/Auth'

import { ForgotPassword, Login, Register, ResetConfirm } from 'Modules/Auth'
import { Dashboard } from 'Modules/Dashboard'
import { Inputs } from 'Modules/Inputs'
import { NotFound } from 'Modules/NotFound'
import { Outputs } from 'Modules/Outputs'
import { Settings } from 'Modules/Settings'

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Router>
            <Login path="/login" />
            <Register path="/register" />
            <ForgotPassword path="/forgot-password" />
            <ResetConfirm path="/reset-confirm" />
            <ProtectedRoute as={Dashboard} path="dashboard/*" />
            <ProtectedRoute as={Inputs} path="inputs/*" />
            <ProtectedRoute as={Outputs} path="outputs/*" />
            <ProtectedRoute as={Settings} path="settings/*" />
            <Redirect from="/" to="/dashboard" noThrow />
            <NotFound default />
          </Router>
        </Styled.root>
      </ThemeProvider>
    </AuthProvider>
  )
}
