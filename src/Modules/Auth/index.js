import * as api from './Api'

export { api }
export { AuthCard } from './Components/AuthCard'
export { ProtectedRoute } from './Components/ProtectedRoute'

export { AuthProvider, useAuth, setLocalStorageToken } from './Hooks/useAuth'
export { useLogout } from './Hooks/useLogout'

export { ForgotPassword } from './Modules/ForgotPassword'
export { Login } from './Modules/Login'
export { Register } from './Modules/Register'
export { ResetConfirm } from './Modules/ResetConfirm'
