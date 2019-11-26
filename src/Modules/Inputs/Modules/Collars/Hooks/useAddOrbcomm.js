import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import timezones from '../timezones.json'
import { addOrbcommMachine } from '../Machines/addOrbcommMachine'

const formOpts = {
  initialValues: {
    orbcommTimezone: timezones[0].offset,
    orbcommCompanyId: '',
    outputAgol: false,
    outputDatabase: false,
    outputKml: false
  },
  validationSchema: yup.object().shape({
    orbcommTimezone: yup
      .string()
      .label('Timezone')
      .required(),
    orbcommCompanyId: yup
      .string()
      .label('Company')
      .required(),
    outputAgol: yup.boolean(),
    outputDatabase: yup.boolean(),
    outputKml: yup.boolean()
  })
}

export function useAddOrbcomm({ onAdd, type }) {
  const [state, send] = useMachine(
    addOrbcommMachine.withConfig({
      actions: {
        notifySuccess: onAdd
      }
    })
  )

  const isShowing = state.matches('adding')
  const isAdding = state.matches('adding.submitting.loading')

  function handleOpen() {
    send('OPEN_MODAL')
  }

  function handleClose() {
    send('CLOSE_MODAL')
  }

  function handleSubmit(values) {
    const data = { ...values, type }
    send('SUBMIT', { data })
  }

  return {
    formOpts: {
      ...formOpts,
      onSubmit: handleSubmit
    },
    handleOpen,
    handleClose,
    metadata: {
      timezones,
      isShowing,
      isAdding
    }
  }
}
