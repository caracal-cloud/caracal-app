import * as R from 'ramda'
import { useMachine } from '@xstate/react'

import { listDocsMachine } from '../Machines/listDocsMachine'

export function useListDocs() {
  const [state, send] = useMachine(listDocsMachine)

  const { data } = state.context
  const count = R.prop('count', data)
  const results = R.prop('results', data)
  const isLoading =
    state.matches('fetching.loading') || state.matches('deleting.loading')

  const isEmpty = !isLoading && data && data.results && !data.results.length
  const hasResults = results && results.length > 0

  function handleReload() {
    send('RELOAD')
  }

  function handleDelete(uid) {
    return () => {
      send('DELETE', { data: { uid } })
    }
  }

  function handleChangePage(page) {
    send('CHANGE_PAGE', { data: { page } })
  }

  return {
    handleReload,
    handleDelete,
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
