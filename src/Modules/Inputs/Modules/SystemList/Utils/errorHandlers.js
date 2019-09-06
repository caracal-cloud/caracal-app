import * as R from 'ramda'
import { message } from 'antd'
import humanize from 'humanize-string'

const dataResponse = R.uncurryN(2, type => R.path(['response', 'data', type]))

export const accountEditHandler = (_, ev) => {
  const msg = dataResponse('message', ev.data)
  const bloodTypeErr = dataResponse('bloodType', ev.data)
  const nonFieldErr = dataResponse('nonFieldErrors', ev.data)

  if (nonFieldErr && nonFieldErr.length > 0) {
    message.error(nonFieldErr[0])
    return
  }

  if (bloodTypeErr && bloodTypeErr.length > 0) {
    message.error(bloodTypeErr[0])
    return
  }

  message.error(msg ? humanize(msg) : 'Something wrong happened, try again!')
}
