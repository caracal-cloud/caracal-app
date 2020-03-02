import * as R from 'ramda'
import { Machine, assign } from 'xstate'

const actions = {
  setData: assign((ctx, ev) => {
    console.log(ev.data)
    return R.assoc('data', ev.data, ctx)
  }),
  setPage: assign((ctx, ev) => {
    return R.assoc('page', ev.data.page, ctx)
  })
}

const machine = Machine({
  id: 'phoneResource',
  initial: 'fetching',
  context: {
    page: 1,
    data: {
      results: [],
      count: 0
    }
  },
  states: {
    fetching: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchResource',
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
        RELOAD: {
          target: 'fetching'
        },
        CHANGE_PAGE: {
          actions: 'setPage',
          target: 'fetching'
        }
      }
    }
  }
})

export const phoneResourceMachine = machine.withConfig({
  actions
})
