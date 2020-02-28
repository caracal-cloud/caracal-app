import * as R from 'ramda'
import { Machine, assign } from 'xstate'
import { getArcgisAccount } from 'Modules/Outputs/Modules/ArcgisOnline/Api'

const services = {
  getAccount: async () => {
    const res = await getArcgisAccount()
    return res.data
  }
}

const actions = {
  setConnection: assign((ctx, ev) => {
    return R.assoc('connected', ev.data.isConnected, ctx)
  })
}

const machine = Machine({
  id: 'storageCheckbox',
  initial: 'loading',
  context: {
    connected: false
  },
  states: {
    loading: {
      invoke: {
        src: 'getAccount',
        onDone: 'success',
        onError: 'failure'
      }
    },
    failure: {
      type: 'final'
    },
    success: {
      entry: 'setConnection',
      type: 'final'
    }
  }
})

export const storageCheckboxMachine = machine.withConfig({
  actions,
  services
})
