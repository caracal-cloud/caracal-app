import { client } from 'Modules/Core'

export function getLinks() {
  return client.get('/outputs/get_kmz_hrefs/')
}
