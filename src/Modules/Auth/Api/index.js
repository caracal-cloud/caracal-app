import { client } from 'Modules/Core'

export const login = async body => {
  return client.post('/account/login/', body)
}

export const logout = async () => {
  return client.post('/account/logout/')
}

export const register = async body => {
  return client.post('/account/register/', body)
}

export const forgotPassword = async body => {
  return client.post('/account/forgot_password/', body)
}

export const forgotPasswordConfirm = async body => {
  return client.post('/account/forgot_password_confirm/', body)
}
