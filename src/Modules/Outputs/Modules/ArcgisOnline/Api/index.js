import { client } from 'Modules/Core'

export const getArcgisUrl = () => {
  return client.get('/outputs/agol/oauth/get_request_url/', {
    params: {
      callback: window.location.origin + '/outputs/arcgis-callback'
    }
  })
}

export const getArcgisAccount = () => {
  return client.get('/outputs/agol/get_account/')
}

export const disconnect = () => {
  return client.post('/outputs/agol/disconnect/')
}
