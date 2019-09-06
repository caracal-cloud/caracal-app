import * as R from 'ramda'
import axios from 'axios'
import { decamelizeKeys, camelizeKeys } from 'humps'

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  transformRequest: [
    data => {
      return JSON.stringify(decamelizeKeys(data))
    }
  ],
  transformResponse: [
    data => {
      try {
        return camelizeKeys(JSON.parse(data))
      } catch (err) {
        return data
      }
    }
  ],
  headers: {
    'Content-Type': 'application/json'
  }
})

const getNewAccessToken = async err => {
  const { config } = err
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return Promise.reject(err)

  const res = await client.post('/account/refresh/', { refreshToken })
  const accessToken = R.path(['data', 'accessToken'], res)

  localStorage.setItem('accessToken', accessToken)
  config.headers['Authorization'] = `JWT ${accessToken}`
  return axios(config)
}

client.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers['Authorization'] = `JWT ${token}`
  return config
})

client.interceptors.response.use(
  data => {
    return data
  },
  error => {
    const errType = R.path(['response', 'data', 'error'], error)
    return errType === 'access_token_revoked'
      ? getNewAccessToken(error)
      : Promise.reject(error)
  }
)
