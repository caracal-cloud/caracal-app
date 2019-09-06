import * as R from 'ramda'
import { Machine, assign } from 'xstate'

import * as api from '../Api'

const services = {
  fetchChanges: async () => {
    const res = await api.getChanges()
    return R.path(['data', 'results'], res)
  }
}

const actions = {
  setData: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  })
}

const machine = Machine({
  id: 'changes',
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
            src: 'fetchChanges',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          onEntry: 'setData'
        },
        failure: {
          type: 'fynal'
        }
      },
      onDone: {
        target: 'loaded'
      }
    },
    loaded: {
      type: 'final'
    }
  }
})

export const changesMachine = machine.withConfig({
  services,
  actions
})
