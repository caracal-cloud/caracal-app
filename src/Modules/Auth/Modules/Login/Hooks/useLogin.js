import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { useAuth } from 'Modules/Auth'
import { loginMachine } from '../Machines/loginMachine'

const formOpts = {
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email()
      .required(),
    password: yup
      .string()
      .label('Password')
      .min(7)
      .required()
  })
}

export function useLogin() {
  const { setToken } = useAuth()
  const [state, send] = useMachine(
    loginMachine.withConfig({
      actions: {
        setTokenForProvider: (_, ev) => {
          if (ev.data) setToken(ev.data)
        }
      }
    })
  )

  const isLogging = state.matches('logging.loading')

  function handleSubmit(values) {
    send('SUBMIT', { data: values })
  }

  return {
    formOpts,
    isLogging,
    handleSubmit
  }
}
