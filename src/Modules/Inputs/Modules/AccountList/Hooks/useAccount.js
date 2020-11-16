import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { accountMachine } from '../../../Machines/accountMachine'
import * as api from '../Api'

const formOpts = {
  initialValues: {
    outputAgol: false,
    outputKml: false
  },
  validationSchema: yup.object().shape({
    outputAgol: yup.boolean(),
    outputKml: yup.boolean()
  })
}

export function useAccount({ uid }) {
  const [state, send] = useMachine(
    accountMachine
      .withContext({
        uid
      })
      .withConfig({
        services: {
          fetchAccount: async ctx => {
            const res = await api.getAccount(ctx.uid)
            return res.data
          },
          updateAccount: async (_, ev) => {
            return api.updateAccount(ev.data)
          }
        }
      })
  )

  const { data } = state.context
  if (data && data.outputs) {
    formOpts.initialValues = { ...formOpts.initialValues, ...data.outputs }
  }

  const isLoading = state.matches('fetching.loading')
  const isShowingSettings = state.matches('editting')
  const isSubmitting = state.matches('editting.submitting.loading')

  function handleEditSettings() {
    send('EDIT_SETTINGS')
  }

  function handleCloseSettings() {
    send('CLOSE_SETTINGS')
  }

  function handleSubmit(values) {
    console.log('values', values)
    send('SUBMIT', {
      data: {
        ...values,
        accountUid: uid
      }
    })
  }

  return {
    formOpts,
    handleEditSettings,
    handleCloseSettings,
    handleSubmit,
    metadata: {
      data,
      isLoading,
      isShowingSettings,
      isSubmitting
    }
  }
}
