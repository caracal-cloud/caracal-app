import { Machine } from 'xstate'
import { navigate } from '@reach/router'

import { api, setLocalStorageToken } from 'Modules/Auth'
import { handlers } from 'Modules/Core'

const services = {
  login: async (_, ev) => {
    const res = await api.login(ev.data)
    setLocalStorageToken(res.data)
    return res.data
  }
}

const actions = {
  redirectToDashboard: () => {
    navigate('/')
  }
}

const machine = Machine({
  id: 'login',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'logging'
        }
      }
    },
    logging: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'login',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          entry: ['setTokenForProvider'],
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
        target: 'loggedIn'
      }
    },
    loggedIn: {
      onEntry: 'redirectToDashboard',
      type: 'final'
    }
  }
})

export const loginMachine = machine.withConfig({
  actions,
  services
})
