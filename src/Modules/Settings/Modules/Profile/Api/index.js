import { client } from 'Modules/Core'

export const getProfile = () => {
  return client.get('/account/get_profile/')
}

export const updateProfile = body => {
  return client.post('/account/update_account/', body)
}
