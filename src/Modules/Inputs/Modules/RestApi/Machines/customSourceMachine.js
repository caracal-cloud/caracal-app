import * as R from 'ramda'
import { Machine, assign } from 'xstate'
import { message } from 'antd'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

const services = {
  deleteCustomSource: async (ctx, ev) => {
    const sourceUid = ev.data.uid
    return api.deleteCustomSource({ sourceUid })
  },
  getCustomSources: async ctx => {
    const res = await api.getCustomSources(ctx.page)
    return res.data
  }
}

const actions = {
  setSources: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  }),
  setPage: assign((ctx, ev) => {
    return R.assoc('page', ev.data.page, ctx)
  })
}

const machine = Machine({
  id: 'customSources',
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
            src: 'getCustomSources',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: 'setSources',
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
            src: 'deleteCustomSource',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          onEntry: () => {
            message.success('Custom source deleted successfully!')
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

export const customSourceMachine = machine.withConfig({
  actions,
  services
})
