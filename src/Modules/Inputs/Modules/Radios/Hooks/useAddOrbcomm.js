import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { addSystemMachine } from '../Machines/addSystemMachine'

const formOpts = {
  initialValues: {
    outputAgol: false,
    outputDatabase: false,
    outputKml: false
  },
  validationSchema: yup.object().shape({
    outputAgol: yup.boolean(),
    outputDatabase: yup.boolean(),
    outputKml: yup.boolean()
  })
}

export function useAddSystem({ onAdd }) {
  const [state, send] = useMachine(
    addSystemMachine.withConfig({
      actions: {
        notifySuccess: onAdd
      }
    })
  )

  const isShowing = state.matches('adding')
  const isAdding = state.matches('submitting.loading')

  function handleOpen() {
    send('OPEN_MODAL')
  }

  function handleClose() {
    send('CLOSE_MODAL')
  }

  function handleSubmit(values) {
    send('SUBMIT', { data: values })
  }

  return {
    formOpts: {
      ...formOpts,
      onSubmit: handleSubmit
    },
    handleOpen,
    handleClose,
    metadata: {
      isShowing,
      isAdding
    }
  }
}
