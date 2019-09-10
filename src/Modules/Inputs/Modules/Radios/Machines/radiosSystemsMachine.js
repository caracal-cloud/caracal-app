import * as R from 'ramda'
import { Machine, assign } from 'xstate'

import * as api from '../Api'
import { message } from 'antd'
import { handlers } from 'Modules/Core'

const services = {
  fetchAccounts: async ctx => {
    const res = await api.getAccounts(ctx.page)
    return res.data
  },
  deleteAccount: async (_, ev) => {
    const accountUid = ev.data.uid
    return api.deleteAccount({ accountUid })
  }
}

const actions = {
  setAccounts: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  }),
  setPage: assign((ctx, ev) => {
    return R.assoc('page', ev.data.page, ctx)
  })
}

const machine = Machine({
  id: 'radiosSystems',
  initial: 'fetching',
  context: {
    page: 1,
    data: null
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
        CHANGE_PAGE: {
          actions: 'setPage',
          target: 'fetching'
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

export const radiosSystemsMachine = machine.withConfig({
  actions,
  services
})
