import { useMachine } from '@xstate/react'

import { listDocsMachine } from '../Machines/listDocsMachine'

export function useListDocs() {
  const [state, send] = useMachine(listDocsMachine)

  const { data } = state.context
  const isLoading =
    state.matches('fetching.loading') || state.matches('deleting.loading')

  function handleReload() {
    send('RELOAD')
  }

  function handleDelete(uid) {
    return () => {
      send('DELETE', { data: { uid } })
    }
  }

  return {
    handleReload,
    handleDelete,
    metadata: {
      data,
      isLoading
    }
  }
}
