import { client } from 'Modules/Core'

export const addCustomSource = body => {
  return client.post('/source/add_source/', body)
}

export const deleteCustomSource = body => {
  return client.post('/source/delete_source/', body)
}

export const getCustomSources = (page = 1) => {
  return client.get('/source/get_sources/', {
    params: {
      page
    }
  })
}

export const getDevices = (page = 1) => {
  return client.get('/source/get_devices/', {
    params: {
      page
    }
  })
}
