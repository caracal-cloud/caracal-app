import { useMachine } from '@xstate/react'
import { navigate } from '@reach/router'

import { collarsAccountsMachine } from '../Machines/collarsAccountsMachine'

export function useCollarsAccounts() {
  const [state, send] = useMachine(collarsAccountsMachine)

  const { data, specie } = state.context
  const isLoading = state.matches('fetching.loading')
  const isEmpty = !isLoading && data && !data.length

  function handleView(account) {
    return () => {
      navigate(`/inputs/collars/accounts/${account.uid}`)
    }
  }

  function handleDelete(account) {
    return () => {
      send('DELETE_ACCOUNT', { data: account })
    }
  }

  function handleSelectSpecie(val) {
    send('SET_SPECIE', { data: val })
  }

  function handleReload() {
    send('RELOAD')
  }

  return {
    handleView,
    handleDelete,
    handleReload,
    handleSelectSpecie,
    metadata: {
      data,
      specie,
      isLoading,
      isEmpty
    }
  }
}
