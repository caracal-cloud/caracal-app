import { client } from 'Modules/Core'

export const getPhones = async () => {
  return await client.get(`/jackal/get_phones/`)
}

export const updatePhone = body => {
  return client.post('/jackal/update_phone/', body)
}

export const getNetwork = () => {
  return client.get('/jackal/get_network/')
}

export const updateNetwork = body => {
  return client.post('/jackal/update_network/', body)
}
