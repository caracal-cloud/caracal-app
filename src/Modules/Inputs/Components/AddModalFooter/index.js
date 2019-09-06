/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Modal, Button } from 'Modules/Core'

export function AddModalFooter(props) {
  return (
    <Modal.Footer className={props.className}>
      <Button intent="default" onClick={props.onCancel}>
        {props.cancelText}
      </Button>
      <Button type="submit" loading={props.loading} disabled={props.disabled}>
        Add
      </Button>
    </Modal.Footer>
  )
}

AddModalFooter.defaultProps = {
  cancelText: 'Cancel'
}
