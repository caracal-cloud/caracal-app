import { client } from 'Modules/Core'

export const addAccount = body => {
  return client.post('/radios/add_account/', body)
}

export const deleteAccount = body => {
  return client.post('/radios/delete_account/', body)
}

export const getAccounts = async (page = 1) => {
  return client.get('/radios/get_accounts/', {
    params: {
      page
    }
  })
}
