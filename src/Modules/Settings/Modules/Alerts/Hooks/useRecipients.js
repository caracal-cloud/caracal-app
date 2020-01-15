import * as R from 'ramda'
import { message } from 'antd'
import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

import * as api from '../Api'
import { handlers } from 'Modules/Core'

export const machine = Machine({
  id: 'recipients',
  initial: 'fetching',
  context: {
    data: null
  },
  states: {
    fetching: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: async () => {
              const res = await api.getRecipients()
              return res.data
            },
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          entry: assign({
            data: (_, ev) => ev.data
          })
        },
        failure: {
          type: 'final'
        }
      },
      onDone: 'idle'
    },
    idle: {
      on: {
        RELOAD: 'fetching',
        DELETE: 'deleting'
      }
    },
    deleting: {
      invoke: {
        src: (_, ev) => send => {
          api
            .deleteRecipient(ev.data)
            .then(() => send('SUCCESS'))
            .catch(err => send({ type: 'ERROR', data: err }))
        }
      },
      on: {
        ERROR: {
          target: 'idle',
          actions: handlers.formSubmitHandler
        },
        SUCCESS: {
          target: 'fetching',
          actions: () => {
            message.success('Recipient deleted succesfully!')
          }
        }
      }
    }
  }
})

export function useRecipients() {
  const [state, send] = useMachine(machine)

  const { data } = state.context
  const recipientsList = R.propOr([], 'results', data)
  const isLoading = state.matches('fetching.loading')
  const isDeleting = state.matches('deleting')

  function handleReload() {
    send('RELOAD')
  }

  function handleDelete(recipientUid) {
    send('DELETE', { data: { recipientUid } })
  }

  return {
    handleReload,
    handleDelete,
    metadata: {
      data,
      recipientsList,
      isLoading,
      isDeleting
    }
  }
}
