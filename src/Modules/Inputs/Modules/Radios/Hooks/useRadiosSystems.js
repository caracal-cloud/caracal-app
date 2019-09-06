import { useMachine } from '@xstate/react'
import { navigate } from '@reach/router'

import { radiosSystemsMachine } from '../Machines/radiosSystemsMachine'

export function useRadiosSystems() {
  const [state, send] = useMachine(radiosSystemsMachine)

  const { data } = state.context
  const isLoading = state.matches('fetching.loading')
  const isEmpty = !isLoading && data && !data.length

  function handleView(account) {
    return () => {
      navigate(`/inputs/radios/systems/${account.uid}`)
    }
  }

  function handleDelete(account) {
    return () => {
      send('DELETE_ACCOUNT', { data: account })
    }
  }

  function handleReload() {
    send('RELOAD')
  }

  return {
    handleView,
    handleDelete,
    handleReload,
    metadata: {
      data,
      isLoading,
      isEmpty
    }
  }
}
