import { client } from 'Modules/Core'

export const getRecipients = async () => {
  return client.get('/account/alerts/get_recipients/')
}

export const addRecipient = async body => {
  return client.post('/account/alerts/add_recipient/', body)
}

export const deleteRecipient = async body => {
  return client.post('/account/alerts/delete_recipient/', body)
}
