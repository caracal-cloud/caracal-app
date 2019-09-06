import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { handlers } from 'Modules/Core'

import { individualMachine } from '../../../Machines/individualMachine'
import * as api from '../Api'

const formOpts = {
  initialValues: {
    name: '',
    sex: '',
    status: ''
  },
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .label('Name')
      .required(),
    sex: yup
      .string()
      .label('Sex')
      .required(),
    status: yup
      .string()
      .label('Status')
      .required(),
    subtype: yup
      .string()
      .label('Subtype')
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
          return api.updateIndividual({
            ...ev.data,
            individualUid: ctx.item.uid
          })
        }
      }
    })
  )

  const { item } = state.context
  const isSubmitting = state.matches('editting.updating.loading')
  const isShowingModal = state.matches('editting')
  const modalTitle = item && `${item.name} (${item.uid})`

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
