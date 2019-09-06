import { Machine } from 'xstate'

import { api } from 'Modules/Auth'
import { handlers } from 'Modules/Core'

const services = {
  register: async (_, ev) => {
    try {
      return api.register(ev.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

const machine = Machine({
  id: 'register',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'registering'
        }
      }
    },
    registering: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'register',
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
        target: 'registered'
      }
    },
    registered: {
      type: 'final'
    }
  }
})

export const registerMachine = machine.withConfig({
  services
})
