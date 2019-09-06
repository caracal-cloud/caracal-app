import * as R from 'ramda'
import { Machine, assign } from 'xstate'

import * as api from '../Api'

const services = {
  fetchLinks: async () => {
    const res = await api.getLinks()
    return res.data
  }
}

const actions = {
  setLinks: assign((ctx, ev) => {
    return R.assoc('links', ev.data, ctx)
  })
}

const machine = Machine({
  id: 'googleEarth',
  initial: 'fetching',
  context: {
    links: {}
  },
  states: {
    fetching: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchLinks',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: 'setLinks',
          type: 'final'
        },
        failure: {
          type: 'final'
        }
      }
    }
  }
})

export const googleEarthMachine = machine.withConfig({
  actions,
  services
})
