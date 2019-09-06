import React from 'react'
import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider(props) {
  const [token, setToken] = useState(null)
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const setLocalStorageToken = data => {
  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  const accessToken = localStorage.getItem('accessToken')

  return {
    setToken: ctx.setToken,
    token: ctx.token || accessToken
  }
}
