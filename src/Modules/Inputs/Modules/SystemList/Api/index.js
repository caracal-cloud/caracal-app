import { client } from 'Modules/Core'

export const getAccount = async uid => {
  return client.get(`/radios/get_account/${uid}`)
}

export const getIndividuals = async (uid, page = 1) => {
  return client.get(`/radios/get_individuals/`, {
    params: {
      page,
      account_uid: uid
    }
  })
}

export const updateIndividual = body => {
  return client.post('/radios/update_individual/', body)
}

export const updateAccount = body => {
  return client.post('/radios/update_account/', body)
}
