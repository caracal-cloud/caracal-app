import * as R from 'ramda'
import { Machine, assign } from 'xstate'

import * as api from '../Api'
import { message } from 'antd'
import { handlers } from 'Modules/Core'

const actions = {
  setData: assign((ctx, ev) => {
    const data = R.path(['data', 'results'], ev)
    return R.assoc('data', data, ctx)
  })
}

const services = {
  fetchDocs: async () => {
    const res = await api.fetchDocs()
    return res.data
  },
  deleteDoc: async (_, ev) => {
    return api.deleteDoc({ accountUid: ev.data.uid })
  }
}

const machine = Machine({
  id: 'listDocs',
  initial: 'fetching',
  context: {
    data: []
  },
  states: {
    fetching: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchDocs',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: 'setData',
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
        RELOAD: 'fetching',
        DELETE: 'deleting'
      }
    },
    deleting: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'deleteDoc',
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

export const listDocsMachine = machine.withConfig({
  actions,
  services
})
