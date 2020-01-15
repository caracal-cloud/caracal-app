import { Machine } from 'xstate'
import { message } from 'antd'
import { useFormik } from 'formik'
import * as yup from 'yup'

import * as api from '../Api'
import { handlers } from 'Modules/Core'
import { useMachine } from '@xstate/react'
import { formUtils } from 'Modules/Core'

const { phoneNumberRegExp } = formUtils.validations

const machine = Machine({
  id: 'recipientsAddModal',
  initial: 'idle',
  states: {
    idle: {
      on: {
        OPEN: 'opened'
      }
    },
    opened: {
      on: {
        SUBMIT: 'adding',
        CLOSE: 'idle'
      }
    },
    adding: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: async (_, ev) => {
              return api.addRecipient(ev.data)
            },
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final',
          onEntry: [
            'notifySuccess',
            () => {
              message.success('Recipient added succesfully!')
            }
          ]
        },
        failure: {
          onEntry: handlers.formSubmitHandler,
          on: {
            SUBMIT: 'loading',
            CLOSE: '#recipientsAddModal.idle'
          }
        }
      },
      onDone: {
        target: 'idle'
      }
    }
  }
})

const formOpts = {
  initialValues: {
    type: 'phone',
    value: ''
  },
  validationSchema: yup.object().shape({
    value: yup.string().when('type', {
      is: 'phone',
      then: yup
        .string()
        .label('Phone')
        .matches(phoneNumberRegExp, 'Please enter a valid phone number')
        .required(),
      otherwise: yup
        .string()
        .label('Email')
        .email()
        .required()
    })
  })
}

export function useAddModal({ onAddOrDelete }) {
  const [state, send] = useMachine(
    machine.withConfig({
      actions: {
        notifySuccess: onAddOrDelete
      }
    })
  )

  const isOpened = !state.matches('idle')
  const isAdding = state.matches('adding.loading')

  const form = useFormik({ ...formOpts, onSubmit: handleSubmit })
  const isPhoneSelected = form.values.type === 'phone'

  function handleOpen() {
    send('OPEN')
  }

  function handleClose() {
    send('CLOSE')
    form.resetForm()
  }

  function handleSubmit(values) {
    const prop = values.type === 'phone' ? 'phoneNumber' : 'email'
    send('SUBMIT', { data: { [prop]: values.value } })
  }

  return {
    form,
    handleOpen,
    handleClose,
    handleSubmit,
    metadata: {
      isOpened,
      isAdding,
      isPhoneSelected
    }
  }
}
