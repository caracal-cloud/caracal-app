import * as R from 'ramda'
import { Machine, assign } from 'xstate'
import { message } from 'antd'

import { handlers } from 'Modules/Core'

const actions = {
  setData: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  })
}

const machine = Machine({
  id: 'account',
  initial: 'fetching',
  context: {
    uid: null,
    data: null
  },
  states: {
    fetching: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchAccount',
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
        EDIT_SETTINGS: {
          target: 'editting'
        }
      }
    },
    editting: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            CLOSE_SETTINGS: {
              target: '#account.idle'
            },
            SUBMIT: {
              target: 'submitting'
            }
          }
        },
        submitting: {
          initial: 'loading',
          states: {
            loading: {
              invoke: {
                src: 'updateAccount',
                onDone: 'success',
                onError: 'failure'
              }
            },
            success: {
              type: 'final',
              onEntry: () => {
                message.success('Account updated successfully!')
              }
            },
            failure: {
              onEntry: handlers.formSubmitHandler,
              type: 'final'
            }
          },
          onDone: {
            target: 'added'
          }
        },
        added: {
          after: {
            300: '#account.idle'
          }
        }
      }
    }
  }
})

export const accountMachine = machine.withConfig({
  actions
})
