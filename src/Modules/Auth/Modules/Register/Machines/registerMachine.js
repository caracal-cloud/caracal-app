import { Machine } from 'xstate'
import { navigate } from '@reach/router'

import { handlers } from 'Modules/Core'
import { api, setLocalStorageToken } from 'Modules/Auth'

const services = {
  register: async (_, ev) => {
    const res = await api.register(ev.data)
    setLocalStorageToken(res.data)
    return res.data
  }
}

const actions = {
  goToDashboard: () => {
    navigate('/')
  }
}

const machine = Machine({
  id: 'register',
  initial: 'idle',
  context: {
    count: 0,
    credentials: null
  },
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
      after: {
        5000: {
          actions: 'goToDashboard'
        }
      }
    }
  }
})

export const registerMachine = machine.withConfig({
  services,
  actions
})
