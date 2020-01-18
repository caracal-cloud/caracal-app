import * as R from 'ramda'
import humanize from 'humanize-string'
import { message } from 'antd'

const dataResponse = R.uncurryN(2, type => R.path(['response', 'data', type]))

const formSubmitHandler = (_, ev) => {
  const msg = dataResponse('message', ev.data)
  const detail = dataResponse('detail', ev.data)
  const error = dataResponse('error', ev.data)
  const nonFieldErrors = dataResponse('nonFieldErrors', ev.data)

  if (msg) return message.error(humanize(msg))
  if (detail) return message.error(humanize(detail))
  if (error) return message.error(humanize(error))
  if (nonFieldErrors && nonFieldErrors.length > 0) {
    return message.error(humanize(nonFieldErrors[0]))
  }

  return message.error('Something wrong happened, try again!')
}

export const handlers = {
  formSubmitHandler
}
