import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { formUtils } from 'Modules/Core'

import { individualMachine } from '../../../Machines/individualMachine'
import { accountEditHandler } from '../Utils/errorHandlers'
import * as api from '../Api'

const { phoneNumberRegExp } = formUtils.validations

const formOpts = {
  initialValues: {
    callSign: '',
    bloodType: '',
    phoneNumber: '',
    status: ''
  },
  validationSchema: yup.object().shape({
    callSign: yup
      .string()
      .label('Callsign')
      .required(),
    bloodType: yup
      .string()
      .label('Bloodtype')
      .required(),
    phoneNumber: yup
      .string()
      .label('Phone number')
      .matches(phoneNumberRegExp, 'Please enter a valid phone number')
      .required(),
    status: yup
      .string()
      .label('Status')
      .required()
  })
}

export function useIndividual({ onUpdateSuccess }) {
  const [state, send] = useMachine(
    individualMachine.withConfig({
      actions: {
        notifyUpdated: onUpdateSuccess,
        showErrorMessage: accountEditHandler
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
