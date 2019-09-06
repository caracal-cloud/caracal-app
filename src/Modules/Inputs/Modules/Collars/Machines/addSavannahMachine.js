import { Machine } from 'xstate'
import { message } from 'antd'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

const services = {
  addNewSavannah: async (ctx, ev) => {
    return api.addAccount({
      ...ev.data,
      provider: 'savannah_tracking'
    })
  }
}

const machine = Machine({
  id: 'addSavannah',
  initial: 'idle',
  states: {
    idle: {
      on: {
        OPEN_MODAL: {
          target: 'adding'
        }
      }
    },
    adding: {
      initial: 'idle',
      on: {
        CLOSE_MODAL: {
          target: 'idle'
        }
      },
      states: {
        idle: {
          on: {
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
                src: 'addNewSavannah',
                onDone: 'success',
                onError: 'failure'
              }
            },
            success: {
              type: 'final',
              onEntry: () => {
                message.success('New savannah tracking added successfully!')
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
            target: 'added'
          }
        },
        added: {
          onEntry: 'notifySuccess',
          after: {
            300: '#addSavannah.idle'
          }
        }
      }
    }
  }
})

export const addSavannahMachine = machine.withConfig({
  services
})
