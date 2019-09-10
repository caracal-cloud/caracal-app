import * as R from 'ramda'
import { Machine, assign } from 'xstate'

import * as api from '../Api'
import { message } from 'antd'
import { handlers } from 'Modules/Core'

const services = {
  fetchDocs: async ctx => {
    const res = await api.fetchDocs(ctx.page)
    return res.data
  },
  deleteDoc: async (_, ev) => {
    return api.deleteDoc({ accountUid: ev.data.uid })
  }
}

const actions = {
  setData: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  }),
  setPage: assign((ctx, ev) => {
    return R.assoc('page', ev.data.page, ctx)
  })
}

const machine = Machine({
  id: 'listDocs',
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
        DELETE: 'deleting',
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
