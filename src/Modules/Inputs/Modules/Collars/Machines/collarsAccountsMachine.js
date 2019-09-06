import * as R from 'ramda'
import { Machine, assign } from 'xstate'
import { message } from 'antd'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

const services = {
  fetchAccounts: async () => {
    const res = await api.getAccounts()
    return R.path(['data', 'results'], res)
  },
  deleteAccount: async (ctx, ev) => {
    const accountUid = ev.data.uid
    return api.deleteAccount({ accountUid })
  }
}

const actions = {
  setAccounts: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  }),
  setSpecie: assign((ctx, ev) => {
    return R.assoc('specie', ev.data, ctx)
  })
}

const machine = Machine({
  id: 'collarsAccounts',
  initial: 'fetching',
  context: {
    data: [],
    specie: 'elephant'
  },
  states: {
    fetching: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchAccounts',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: 'setAccounts',
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
        DELETE_ACCOUNT: {
          target: 'deleting'
        },
        RELOAD: {
          target: 'fetching'
        },
        SET_SPECIE: {
          actions: 'setSpecie'
        }
      }
    },
    deleting: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'deleteAccount',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          onEntry: () => {
            message.success('Deleted successfully!')
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
        target: 'fetching'
      }
    }
  }
})

export const collarsAccountsMachine = machine.withConfig({
  actions,
  services
})
