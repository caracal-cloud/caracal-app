/** @jsx jsx */
import * as R from 'ramda'
import { jsx } from 'theme-ui'
import { Formik } from 'formik'

import { Modal, Button } from 'Modules/Core'
import { StorageCheckbox } from '../StorageCheckbox'

export function EditAccountModal({ account }) {
  return (
    <Modal
      title="Edit Settings"
      visible={account.metadata.isShowingSettings}
      onCancel={account.handleCloseSettings}
      footer={null}
    >
      <Formik
        {...account.formOpts}
        onSubmit={account.handleSubmit}
        initialValues={R.path(['metadata', 'data', 'outputs'], account)}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <StorageCheckbox {...props} />
            <Modal.Footer>
              <Button intent="default" onClick={account.handleCloseSettings}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={account.metadata.isSubmitting}
                disabled={!props.dirty}
              >
                Save
              </Button>
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  )
}
