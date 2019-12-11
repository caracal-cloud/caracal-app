import { useMachine } from '@xstate/react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { addSavannahMachine } from '../Machines/addSavannahMachine'

const formOpts = {
  initialValues: {
    savannahTrackingUsername: '',
    savannahTrackingPassword: '',
    outputAgol: false,
    outputDatabase: false,
    outputKml: false
  },
  validationSchema: yup.object().shape({
    savannahTrackingUsername: yup
      .string()
      .label('Username')
      .required(),
    savannahTrackingPassword: yup
      .string()
      .label('Password')
      .min(7)
      .required(),
    outputAgol: yup.boolean(),
    outputDatabase: yup.boolean(),
    outputKml: yup.boolean()
  })
}

export function useAddSavannah({ onAdd, type }) {
  const form = useFormik({
    ...formOpts,
    onSubmit: handleSubmit
  })

  const [state, send] = useMachine(
    addSavannahMachine.withConfig({
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
    form,
    handleOpen,
    handleClose,
    metadata: {
      isShowing,
      isAdding
    }
  }
}
