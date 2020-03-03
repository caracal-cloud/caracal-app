import { client } from 'Modules/Core'

export const getPhone = async ({ uid }) => {
  return client.get(`/jackal/get_phone/${uid}`)
}

export const getContacts = async (uid, page) => {
  return client.get(`/jackal/get_contacts`, {
    params: {
      page,
      phone_uid: uid
    }
  })
}

export const getCalls = async (uid, page) => {
  return client.get(`/jackal/get_calls`, {
    params: {
      page,
      phone_uid: uid
    }
  })
}

export const getTexts = async (uid, page) => {
  return client.get(`/jackal/get_texts`, {
    params: {
      page,
      phone_uid: uid
    }
  })
}

export const getLocations = async (uid, page) => {
  return client.get(`/jackal/get_locations`, {
    params: {
      page,
      phone_uid: uid
    }
  })
}
