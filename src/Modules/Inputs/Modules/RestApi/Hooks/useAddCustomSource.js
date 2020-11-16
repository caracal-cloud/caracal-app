import * as R from 'ramda'
import { useFormik } from 'formik'
import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { addCustomSourceMachine } from '../Machines/addCustomSourceMachine'

const formOpts = {
  initialValues: {
    name: '',
    description: '',
    outputAgol: false,
    outputKml: false
  },
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .label('Title')
      .required(),
    description: yup
      .string()
      .label('Description')
      .required(),
    outputAgol: yup.boolean(),
    outputKml: yup.boolean()
  })
}

export function useAddCustomSource({ onAdd }) {
  const form = useFormik({
    ...formOpts,
    onSubmit: handleSubmit
  })

  const [state, send] = useMachine(
    addCustomSourceMachine.withConfig({
      actions: {
        notifySuccess: () => {
          form.resetForm()
          onAdd()
        }
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
    form.resetForm()
  }

  function handleSubmit(values) {
    const data = { ...values }
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
