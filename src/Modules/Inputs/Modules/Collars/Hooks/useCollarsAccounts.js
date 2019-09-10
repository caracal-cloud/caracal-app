import * as R from 'ramda'
import { useMachine } from '@xstate/react'
import { navigate } from '@reach/router'

import { collarsAccountsMachine } from '../Machines/collarsAccountsMachine'

export function useCollarsAccounts() {
  const [state, send] = useMachine(collarsAccountsMachine)

  const { data, specie } = state.context
  const count = R.prop('count', data)
  const results = R.prop('results', data)
  const isLoading = state.matches('fetching.loading')
  const isEmpty = !isLoading && data && data.results && !data.results.length
  const hasResults = results && results.length > 0

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

  function handleChangePage(page) {
    send('CHANGE_PAGE', { data: { page } })
  }

  return {
    handleView,
    handleDelete,
    handleReload,
    handleSelectSpecie,
    handleChangePage,
    metadata: {
      count,
      results,
      specie,
      isLoading,
      isEmpty,
      hasResults
    }
  }
}
