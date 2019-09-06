/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useMemo, useState } from 'react'

import { Button, Divider, Modal } from 'Modules/Core'

export function ModalWithSteps({
  modalContainer,
  steps,
  onOk,
  okProps,
  okText,
  ...props
}) {
  const [step, setStep] = useState(() => 0)
  const ModalContainer = useMemo(() => modalContainer, [modalContainer])

  function handleBack() {
    setStep(step - 1)
  }

  function handleNext() {
    setStep(step + 1)
  }

  return (
    <Modal {...props} footer={null}>
      <ModalContainer>
        {steps &&
          steps.length > 0 &&
          steps.map((el, idx) => step === idx && el)}
        <Divider gap={3} />
        <div
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse'
          }}
        >
          {step === 1 && (
            <Button intent="primary" onClick={onOk} {...okProps}>
              {okText}
            </Button>
          )}
          {step === 0 && (
            <Button intent="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {step === 1 && (
            <Button intent="default" onClick={handleBack}>
              Back
            </Button>
          )}
        </div>
      </ModalContainer>
    </Modal>
  )
}

ModalWithSteps.defaultProps = {
  okText: 'Add',
  modalContainer: ({ children }) => <div>{children}</div>
}
