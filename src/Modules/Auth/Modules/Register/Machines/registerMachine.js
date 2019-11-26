import { Machine, assign } from 'xstate'
import { navigate } from '@reach/router'

import { handlers } from 'Modules/Core'
import { api, setLocalStorageToken } from 'Modules/Auth'

const services = {
  register: async (_, ev) => {
    return api.register(ev.data)
  },
  login: async ctx => {
    const res = await api.login(ctx.credentials)
    setLocalStorageToken(res.data)
    return res.data
  }
}

const actions = {
  setCredentials: assign({
    credentials: (_, { data }) => ({
      email: data.accountEmail,
      password: data.accountPassword
    })
  }),
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
          entry: 'setCredentials',
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
        target: 'login'
      }
    },
    login: {
      invoke: {
        src: 'login',
        onDone: 'registered'
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
