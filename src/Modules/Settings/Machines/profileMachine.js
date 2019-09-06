import * as R from 'ramda'
import { Machine, assign } from 'xstate'
import { message } from 'antd'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

const services = {
  fetchProfile: async () => {
    const res = await api.getProfile()
    return res.data
  },
  updateProfile: async (_, ev) => {
    return api.updateProfile(ev.data)
  }
}

const actions = {
  setProfile: assign((ctx, ev) => {
    return R.assoc('profile', ev.data, ctx)
  })
}

const machine = Machine({
  id: 'profile',
  initial: 'fetching',
  context: {
    profile: null
  },
  states: {
    fetching: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchProfile',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: 'setProfile',
          type: 'final'
        },
        failure: {
          type: 'final'
        }
      },
      onDone: {
        target: 'idle'
      }
    },
    idle: {
      on: {
        SUBMIT: {
          target: 'submitting'
        }
      }
    },
    submitting: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'updateProfile',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          onEntry: () => {
            message.success('Profile updated successfully!')
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
        target: 'idle'
      }
    }
  }
})

export const profileMachine = machine.withConfig({
  actions,
  services
})
