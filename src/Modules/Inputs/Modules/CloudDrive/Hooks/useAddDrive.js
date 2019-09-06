import { useMachine } from '@xstate/react'
import * as yup from 'yup'

import { addDriveMachine } from '../Machines/addDriveMachine'

const formOpts = {
  initialValues: {
    fileType: 'google_sheet',
    provider: 'google',
    sheetIds: [],
    outputAgol: false,
    outputDatabase: false,
    outputKml: false
  },
  validationSchema: yup.object().shape({
    headerRowIndex: yup
      .number()
      .label('Header row index')
      .nullable()
      .required(),
    coordinateSystem: yup
      .string()
      .label('Cordinate system')
      .nullable()
      .required(),
    sheetIds: yup
      .array()
      .label('Sheet Ids')
      .min(1)
  })
}

export function useAddDrive({ onReload }) {
  const [state, send] = useMachine(
    addDriveMachine.withConfig({
      actions: {
        notifySuccess: onReload
      }
    })
  )

  const { files, sheets, selectedFile } = state.context
  const isAuthenticating = state.matches('authenticating.loading')
  const isGettingFiles = state.matches('gettingFiles.loading')
  const isAdding = state.matches('adding')
  const isListingFiles = state.matches('adding.listingFiles')
  const isLoadingSheets = state.matches('adding.fetchingSheets.loading')
  const isSelectingOptions = state.matches('adding.selectingOptions')
  const isSubmitting = state.matches('adding.submitting.loading')

  function handleOpenModal() {
    send('OPEN_MODAL')
  }

  function handleCloseModal() {
    send('CLOSE_MODAL')
  }

  function handleSelectFile(data) {
    return () => {
      send('SELECT_FILE', { data })
    }
  }

  function handleBack() {
    send('BACK')
  }

  function handleSubmit(values) {
    send('SUBMIT', { data: values })
  }

  return {
    formOpts,
    handleOpenModal,
    handleCloseModal,
    handleSelectFile,
    handleSubmit,
    handleBack,
    metadata: {
      files,
      sheets,
      selectedFile,
      isAuthenticating,
      isGettingFiles,
      isAdding,
      isListingFiles,
      isLoadingSheets,
      isSelectingOptions,
      isSubmitting
    }
  }
}
