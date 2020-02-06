/** @jsx jsx */
import { useEffect } from 'react'
import { jsx } from 'theme-ui'

import {
  Grid,
  Input,
  Select,
  Button,
  Modal,
  usePrevious,
  formUtils
} from 'Modules/Core'

export function PhoneModalForm({ phone, form }) {
  const { isShowingModal } = phone
  const { item } = phone.metadata
  const prevIsShowingModal = usePrevious(isShowingModal)
  const prevItem = usePrevious(item)

  useEffect(() => {
    if (!prevItem || (item && item.uid !== prevItem.uid)) {
      form.setValues({
        name: item.name,
        phoneNumbers: item.phoneNumbers,
        description: item.description,
        status: item.status
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
          {...formUtils.getInputProps('phoneNumbers', form)}
          type="tel"
          leftIcon="phone"
          placeholder="Phone number"
          label="Phone number"
          size="default"
        />
        <Input
          {...formUtils.getInputProps('description', form)}
          type="text"
          label="Description"
          size="default"
        />
        <Select
          {...formUtils.getSelectProps('status', form)}
          noMargin
          label="Status"
          placeholder="Select status"
        >
          <Select.Option value="deployed">Deployed</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
        </Select>
      </Grid>
      <Modal.Footer>
        <Button intent="default" onClick={phone.handleCloseModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          loading={phone.metadata.isSubmitting}
          disabled={!form.dirty}
        >
          Update
        </Button>
      </Modal.Footer>
    </form>
  )
}
