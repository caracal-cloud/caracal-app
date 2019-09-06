import { client } from 'Modules/Core'

export const getAccount = async uid => {
  return client.get(`/collars/get_account/${uid}`)
}

export const getIndividuals = async (uid, page = 1) => {
  return client.get(`/collars/get_individuals/`, {
    params: {
      page,
      account_uid: uid
    }
  })
}

export const updateIndividual = body => {
  return client.post('/collars/update_individual/', body)
}

export const updateAccount = body => {
  return client.post('/collars/update_account/', body)
}
