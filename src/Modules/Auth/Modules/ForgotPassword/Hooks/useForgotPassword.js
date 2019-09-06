import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { forgotPasswordMachine } from '../Machines/forgotPasswordMachine'

const formOpts = {
  initialValues: {
    email: ''
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email()
      .required()
  })
}

export function useForgotPassword() {
  const [state, send] = useMachine(forgotPasswordMachine)

  const isSending = state.matches('sending.loading')
  const isSended = state.matches('sended')

  function handleSubmit(values) {
    send('SUBMIT', { data: values })
  }

  return {
    formOpts,
    handleSubmit,
    isSending,
    isSended
  }
}
