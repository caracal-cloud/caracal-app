import * as R from 'ramda'
import { useFormik } from 'formik'
import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import timezones from '../timezones.json'
import { addOrbcommMachine } from '../Machines/addOrbcommMachine'

const FIRST = timezones[0]

const formOpts = {
  initialValues: {
    orbcommTimezone: `${FIRST.text}@${FIRST.offset}`,
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

const getTimezoneValue = R.evolve({
  orbcommTimezone: v => {
    const [, timezone] = v.match(/@(.+)/)
    return parseInt(timezone)
  }
})

export function useAddOrbcomm({ onAdd, type }) {
  const form = useFormik({
    ...formOpts,
    onSubmit: handleSubmit
  })

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
    form.resetForm()
  }

  function handleSubmit(values) {
    const data = { ...getTimezoneValue(values), type }
    send('SUBMIT', { data })
  }

  return {
    form,
    handleOpen,
    handleClose,
    metadata: {
      timezones,
      isShowing,
      isAdding
    }
  }
}
