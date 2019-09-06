import * as R from 'ramda'
import { Machine, assign } from 'xstate'

import * as api from '../Api'

const services = {
  fetchEvents: async () => {
    const res = await api.getEvents()
    return R.path(['data', 'results'], res)
  }
}

const actions = {
  setData: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  })
}

const machine = Machine({
  id: 'events',
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
            src: 'fetchEvents',
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

export const eventsMachine = machine.withConfig({
  services,
  actions
})
