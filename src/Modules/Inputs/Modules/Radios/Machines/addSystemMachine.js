import { Machine } from 'xstate'
import { message } from 'antd'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

const services = {
  addNewSystem: async (_, ev) => {
    return api.addAccount({
      ...ev.data,
      provider: 'trbonet'
    })
  }
}

const machine = Machine({
  id: 'addSystem',
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
      on: {
        SUBMIT: {
          target: 'submitting'
        },
        CLOSE_MODAL: {
          target: 'idle'
        }
      }
    },
    submitting: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'addNewSystem',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          onEntry: () => {
            message.success('New system added successfully!')
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
        300: 'idle'
      }
    }
  }
})

export const addSystemMachine = machine.withConfig({
  services
})
