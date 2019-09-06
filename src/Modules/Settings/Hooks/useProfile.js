import * as R from 'ramda'
import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { profileMachine } from '../Machines/profileMachine'
import { formUtils } from 'Modules/Core'

const { phoneNumberRegExp } = formUtils.validations

const formOpts = {
  initialValues: {
    email: '',
    name: '',
    phoneNumber: ''
  },
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .label('Name')
      .required(),
    phoneNumber: yup
      .string()
      .label('Phone number')
      .matches(phoneNumberRegExp, 'Please enter a valid phone number')
      .required()
  })
}

export function useProfile() {
  const [state, send] = useMachine(profileMachine)

  const { profile: item } = state.context
  const isFetching = state.matches('fetching.loading')
  const isSubmitting = state.matches('submitting.loading')

  function handleSubmit(values) {
    send('SUBMIT', { data: R.omit(['email'], values) })
  }

  return {
    formOpts,
    handleSubmit,
    metadata: {
      item,
      isFetching,
      isSubmitting
    }
  }
}
