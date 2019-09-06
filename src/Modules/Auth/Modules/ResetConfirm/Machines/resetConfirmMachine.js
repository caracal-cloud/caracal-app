import { Machine } from 'xstate'

import { api } from 'Modules/Auth'
import { handlers } from 'Modules/Core'
import { message } from 'antd'

const services = {
  reset: async (_, ev) => {
    return api.forgotPasswordConfirm(ev.data)
  }
}

const machine = Machine({
  id: 'resetConfirm',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'resetting'
        }
      }
    },
    resetting: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'reset',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          onEntry: () => {
            message.success(
              'Your password has been successfully changed. You can now login.'
            )
          }
        },
        failure: {
          onEntry: handlers.formSubmitHandler,
          on: {
            SUBMIT: 'loading'
          }
        }
      },
      onDone: {
        target: 'resetted'
      }
    },
    resetted: {
      type: 'final'
    }
  }
})

export const resetConfirmMachine = machine.withConfig({
  services
})
