import { client } from 'Modules/Core'

export const getPhone = async ({ uid }) => {
  return client.get(`/jackal/get_phone/${uid}`)
}
