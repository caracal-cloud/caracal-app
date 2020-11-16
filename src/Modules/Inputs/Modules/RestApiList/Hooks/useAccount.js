import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { accountMachine } from '../../../Machines/accountMachine'
import * as api from '../Api'

let formOpts = {
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
            console.log(ev.data)
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
    send('SUBMIT', {
      data: {
        ...values,
        sourceUid: uid
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
