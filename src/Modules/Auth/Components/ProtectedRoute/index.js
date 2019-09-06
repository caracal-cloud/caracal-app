import React from 'react'
import { Redirect } from '@reach/router'

import { useAuth } from 'Modules/Auth/Hooks/useAuth'

export function ProtectedRoute({ as: Component, ...props }) {
  const auth = useAuth()
  if (!auth.token) return <Redirect to="/login" noThrow />
  return <Component {...props} />
}
