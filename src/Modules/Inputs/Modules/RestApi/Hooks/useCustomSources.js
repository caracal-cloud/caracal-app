import * as R from 'ramda'
import { useFormik } from 'formik'
import { useMachine } from '@xstate/react'
import { navigate } from '@reach/router'
import * as yup from 'yup'

import { customSourceMachine } from '../Machines/customSourceMachine'

export const useCustomSources = () => {
  const [state, send] = useMachine(customSourceMachine)

  const { data } = state.context
  const count = R.prop('count', data)
  const results = R.prop('results', data)
  const isLoading =
    state.matches('fetching.loading') || state.matches('deleting')
  const isEmpty = !isLoading && data && data.results && !data.results.length
  const hasResults = results && results.length > 0

  function handleDelete(account) {
    return () => {
      send('DELETE_ACCOUNT', { data: account })
    }
  }

  function handleReload() {
    send('RELOAD')
  }

  function handleView(account) {
    return () => {
      navigate(`/inputs/rest-api/sources/${account.uid}`)
    }
  }

  return {
    handleView,
    handleDelete,
    handleReload,
    metadata: {
      count,
      results,
      isLoading,
      isEmpty,
      hasResults
    }
  }
}
