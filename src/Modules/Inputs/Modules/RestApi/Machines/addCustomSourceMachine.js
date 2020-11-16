import * as R from 'ramda'
import { message } from 'antd'
import { Machine, assign } from 'xstate'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

const services = {
  addCustomSource: async (_, event) => {
    return api.addCustomSource({
      ...event.data
    })
  }
}

const machine = Machine({
  id: 'addCustomSource',
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
                src: 'addCustomSource',
                onDone: 'success',
                onError: 'failure'
              }
            },
            success: {
              type: 'final',
              onEntry: () => {
                message.success('New custom source added successfully!')
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
            300: '#addCustomSource.idle'
          }
        }
      }
    }
  }
})

export const addCustomSourceMachine = machine.withConfig({
  services
})
