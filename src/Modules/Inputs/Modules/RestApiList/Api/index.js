import { client } from 'Modules/Core'

export const getAccount = async uid => {
  return client.get(`/source/get_source/${uid}`)
}

export const getDevices = async (uid, page = 1) => {
  return client.get(`/source/get_devices/`, {
    params: {
      page,
      source_uid: uid
    }
  })
}

export const updateDevice = body => {
  return client.post('/source/update_device/', body)
}

export const updateAccount = body => {
  return client.post('/source/update_source/', body)
}
