import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { handlers } from 'Modules/Core'

import { individualMachine } from '../../../Machines/individualMachine'
import * as api from '../Api'

const formOpts = {
  initialValues: {
    name: '',
    description: ''
  },
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .label('Name')
      .nullable()
      .required(),
    description: yup
      .string()
      .label('Description')
      .nullable()
  })
}

export function useIndividual({ onUpdateSuccess }) {
  const [state, send] = useMachine(
    individualMachine.withConfig({
      actions: {
        notifyUpdated: onUpdateSuccess,
        showErrorMessage: handlers.formSubmitHandler
      },
      services: {
        updateIndividual: async (ctx, ev) => {
          if (!ctx.item.uid) return Promise.reject()
          return api.updateDevice({
            ...ev.data,
            deviceUid: ctx.item.uid
          })
        }
      }
    })
  )

  const { item } = state.context
  const isSubmitting = state.matches('editting.updating.loading')
  const isShowingModal = state.matches('editting')
  const modalTitle =
    item && `${item.deviceId}${item.name ? ` - ${item.name}` : ''}`

  function handleOpenModal(item) {
    return () => {
      return send('OPEN_MODAL', { data: item })
    }
  }

  function handleCloseModal() {
    send('CLOSE_MODAL')
  }

  function handleSubmit(values) {
    send('SUBMIT', { data: values })
  }

  return {
    formOpts,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    metadata: {
      item,
      modalTitle,
      isShowingModal,
      isSubmitting
    }
  }
}
