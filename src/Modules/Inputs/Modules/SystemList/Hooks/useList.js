import * as R from 'ramda'
import { useMachine } from '@xstate/react'

import { accountListMachine } from '../../../Machines/listMachine'
import * as api from '../Api'

export function useList({ uid }) {
  const [state, send] = useMachine(
    accountListMachine
      .withConfig({
        services: {
          fetchList: async ctx => {
            const res = await api.getIndividuals(ctx.uid, ctx.page)
            return res.data
          }
        }
      })
      .withContext({
        uid
      })
  )

  const { data } = state.context
  const isLoading = state.matches('fetching.loading')

  function handleReload() {
    send('RELOAD')
  }

  function handleChangePage(page) {
    send('CHANGE_PAGE', { data: { page } })
  }

  return {
    handleReload,
    handleChangePage,
    metadata: {
      data,
      isLoading
    }
  }
}

export const getData = R.uncurryN(2, prop => {
  return R.path(['metadata', 'data', ...prop.split('.')])
})
