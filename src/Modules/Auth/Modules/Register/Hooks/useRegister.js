import * as R from 'ramda'
import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { registerMachine } from '../Machines/registerMachine'
import { formUtils } from 'Modules/Core'

const { oneWordRegExp, phoneNumberRegExp } = formUtils.validations

const formOpts = {
  initialValues: {
    organizationName: '',
    organizationShortName: '',
    accountName: '',
    accountEmail: '',
    accountPhoneNumber: '',
    accountPassword: '',
    accountConfirmPassword: ''
  },
  validationSchema: yup.object().shape({
    organizationName: yup
      .string()
      .label('Organization name')
      .min(2)
      .required(),
    organizationShortName: yup
      .string()
      .label('Organization short name')
      .matches(oneWordRegExp, 'Please enter only one word')
      .min(4)
      .required(),
    accountName: yup
      .string()
      .label('Account name')
      .min(2)
      .required(),
    accountEmail: yup
      .string()
      .label('Email')
      .email()
      .required(),
    accountPhoneNumber: yup
      .string()
      .label('Phone number')
      .matches(phoneNumberRegExp, 'Please enter a valid phone number')
      .required(),
    accountPassword: yup
      .string()
      .label('Password')
      .min(7)
      .required(),
    accountPasswordConfirm: yup
      .string()
      .label('Confirm password')
      .oneOf([yup.ref('accountPassword')], 'Passwords must match')
      .required()
  })
}

export function useRegister() {
  const [state, send] = useMachine(registerMachine)

  const isRegistered = state.matches('registered')
  const isRegistering = state.matches('registering.loading')

  function handleSubmit(values) {
    const data = R.omit(['accountPasswordConfirm'], values)
    send('SUBMIT', { data })
  }

  return {
    formOpts,
    handleSubmit,
    isRegistering,
    isRegistered
  }
}
