import { client } from 'Modules/Core'

export const addAccount = body => {
  return client.post('/collars/add_account/', body)
}

export const deleteAccount = body => {
  return client.post('/collars/delete_account/', body)
}

export const getAccounts = (page = 1) => {
  return client.get('/collars/get_accounts/', {
    params: {
      page
    }
  })
}
