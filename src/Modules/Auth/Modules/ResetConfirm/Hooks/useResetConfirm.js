import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { resetConfirmMachine } from '../Machines/resetConfirmMachine'

const formOpts = {
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email()
      .required(),
    verificationCode: yup
      .string()
      .label('Verification code')
      .required(),
    newPassword: yup
      .string()
      .label('New password')
      .min(7)
      .required(),
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your password')
  })
}

export function useResetConfirm() {
  const [state, send] = useMachine(resetConfirmMachine)

  const isResetting = state.matches('resetting.loading')
  const isResetted = state.matches('resetted')

  function handleSubmit(values) {
    send('SUBMIT', { data: values })
  }

  return {
    formOpts,
    handleSubmit,
    isResetting,
    isResetted
  }
}
