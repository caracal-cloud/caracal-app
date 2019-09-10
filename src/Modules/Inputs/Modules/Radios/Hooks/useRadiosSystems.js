import * as R from 'ramda'
import { useMachine } from '@xstate/react'
import { navigate } from '@reach/router'

import { radiosSystemsMachine } from '../Machines/radiosSystemsMachine'

export function useRadiosSystems() {
  const [state, send] = useMachine(radiosSystemsMachine)

  const { data } = state.context
  const count = R.prop('count', data)
  const results = R.prop('results', data)
  const isLoading = state.matches('fetching.loading')
  const isEmpty = !isLoading && data && data.results && !data.results.length
  const hasResults = results && results.length > 0

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

  function handleChangePage(page) {
    send('CHANGE_PAGE', { data: { page } })
  }

  return {
    handleView,
    handleDelete,
    handleReload,
    handleChangePage,
    metadata: {
      count,
      results,
      isLoading,
      isEmpty,
      hasResults
    }
  }
}
