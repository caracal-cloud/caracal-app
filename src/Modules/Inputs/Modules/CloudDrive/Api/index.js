import { client } from 'Modules/Core'

export const getRequestUrl = async () => {
  return client.get('/drives/google/oauth/get_request_url/', {
    params: {
      action: 'drive',
      callback: window.location.origin + '/inputs/cloud-drive-callback'
    }
  })
}

export const getFiles = async () => {
  return client.get('/drives/google/get_files/')
}

export const getSheets = async id => {
  return client.get('/drives/google/get_spreadsheet_sheets/', {
    params: {
      file_id: id
    }
  })
}

export const addNewDocument = async body => {
  return client.post('/drives/google/add_account/', body)
}

export const fetchDocs = async () => {
  return client.get('/drives/google/get_accounts/')
}

export const deleteDoc = body => {
  return client.post('/drives/google//delete_account/', body)
}
