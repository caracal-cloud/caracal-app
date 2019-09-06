import { navigate } from '@reach/router'
import { useAuth } from './useAuth'

export function useLogout() {
  const { setToken } = useAuth()

  function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setToken(null)
    navigate('/login')
  }

  return {
    logout
  }
}
