import { Machine } from 'xstate'

import { api } from 'Modules/Auth'
import { handlers } from 'Modules/Core'

const services = {
  forgotPassword: async (_, ev) => {
    return api.forgotPassword(ev.data)
  }
}

const machine = Machine({
  id: 'forgotPassword',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'sending'
        }
      }
    },
    sending: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'forgotPassword',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final'
        },
        failure: {
          onEntry: handlers.formSubmitHandler,
          on: {
            SUBMIT: 'loading'
          }
        }
      },
      onDone: {
        target: 'sended'
      }
    },
    sended: {
      type: 'final'
    }
  }
})

export const forgotPasswordMachine = machine.withConfig({
  services
})
