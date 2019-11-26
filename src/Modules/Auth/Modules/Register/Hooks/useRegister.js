import * as R from 'ramda'
import { useState, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { registerMachine } from '../Machines/registerMachine'

const formOpts = {
  initialValues: {
    accountName: '',
    accountEmail: '',
    organizationName: '',
    accountPassword: '',
    accountPasswordConfirm: ''
  },
  validationSchema: yup.object().shape({
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
    organizationName: yup
      .string()
      .label('Organization')
      .min(2)
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
  const [count, setCount] = useState(0)

  const { credentials } = state.context
  const isRegistered = state.matches('registered')
  const isRegistering = state.matches('registering.loading')

  function handleSubmit(values) {
    const data = R.omit(['accountPasswordConfirm'], values)
    send('SUBMIT', { data })
  }

  useEffect(() => {
    if (!isRegistered) return
    const id = setInterval(() => setCount(R.inc), 1000)
    return () => clearInterval(id)
  }, [isRegistered])

  return {
    formOpts,
    handleSubmit,
    metadata: {
      isRegistering,
      isRegistered,
      count,
      credentials
    }
  }
}
