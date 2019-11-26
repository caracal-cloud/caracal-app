import { Machine } from 'xstate'
import { message } from 'antd'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

const services = {
  addNewOrbcomm: async (_, ev) => {
    return api.addAccount({
      ...ev.data,
      provider: 'orbcomm'
    })
  }
}

const machine = Machine({
  id: 'addOrbcomm',
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
                src: 'addNewOrbcomm',
                onDone: 'success',
                onError: 'failure'
              }
            },
            success: {
              type: 'final',
              onEntry: () => {
                message.success('New Orbcomm added successfully!')
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
            300: '#addOrbcomm.idle'
          }
        }
      }
    }
  }
})

export const addOrbcommMachine = machine.withConfig({
  services
})
