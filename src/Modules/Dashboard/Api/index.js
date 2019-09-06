import { client } from 'Modules/Core'

export const getEvents = async () => {
  return client.get('/activity/get_events/')
}

export const getChanges = async () => {
  return client.get('/activity/get_changes/')
}
