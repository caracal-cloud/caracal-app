/** @jsx jsx */
import { useEffect } from 'react'
import { jsx } from 'theme-ui'

import {
  Grid,
  Input,
  RadioGroup,
  Radio,
  Select,
  Button,
  Modal,
  usePrevious,
  formUtils
} from 'Modules/Core'

export function IndividualForm({ individual, form }) {
  const { isShowingModal } = individual
  const { item } = individual.metadata
  const prevIsShowingModal = usePrevious(isShowingModal)
  const prevItem = usePrevious(item)

  useEffect(() => {
    if (!prevItem || (item && item.uid !== prevItem.uid)) {
      form.setValues({
        name: item.name,
        description: item.description
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, prevItem])

  useEffect(() => {
    if (!prevIsShowingModal && isShowingModal) {
      form.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowingModal, prevIsShowingModal])

  return (
    <form onSubmit={form.handleSubmit}>
      <Grid
        gridColumnGap={4}
        gridRowGap={2}
        gridTemplateColumns="repeat(2, 1fr)"
      >
        <Input
          {...formUtils.getInputProps('name', form)}
          type="text"
          label="Name"
          size="default"
        />
        <Input
          {...formUtils.getInputProps('description', form)}
          type="text"
          label="Description"
          size="default"
        />
      </Grid>
      <Modal.Footer>
        <Button intent="default" onClick={individual.handleCloseModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          loading={individual.metadata.isSubmitting}
          disabled={!form.dirty}
        >
          Update
        </Button>
      </Modal.Footer>
    </form>
  )
}
