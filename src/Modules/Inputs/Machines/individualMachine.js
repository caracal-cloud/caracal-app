import * as R from 'ramda'
import { Machine, assign } from 'xstate'
import { message } from 'antd'

const actions = {
  setItem: assign((ctx, ev) => {
    return R.assoc('item', ev.data, ctx)
  }),
  resetItem: assign(ctx => {
    return R.assoc('item', null, ctx)
  })
}

const machine = Machine({
  id: 'individual',
  initial: 'idle',
  context: {
    item: null
  },
  states: {
    idle: {
      on: {
        OPEN_MODAL: {
          target: 'editting',
          actions: 'setItem'
        }
      }
    },
    editting: {
      initial: 'idle',
      on: {
        CLOSE_MODAL: {
          actions: 'resetItem',
          target: 'idle'
        }
      },
      states: {
        idle: {
          on: {
            SUBMIT: {
              target: 'updating'
            }
          }
        },
        updating: {
          initial: 'loading',
          states: {
            loading: {
              invoke: {
                src: 'updateIndividual',
                onDone: 'success',
                onError: 'failure'
              }
            },
            success: {
              type: 'final',
              onEntry: () => {
                message.success('Individual updated successfully!')
              }
            },
            failure: {
              onEntry: 'showErrorMessage',
              on: {
                SUBMIT: 'loading'
              }
            }
          },
          onDone: {
            target: 'updated'
          }
        },
        updated: {
          onEntry: 'notifyUpdated',
          after: {
            300: '#individual.idle'
          }
        }
      }
    }
  }
})

export const individualMachine = machine.withConfig({
  actions
})
