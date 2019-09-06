/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'

import {
  Grid,
  Input,
  Select,
  Modal,
  Button,
  usePrevious,
  formUtils
} from 'Modules/Core'

export function SystemForm({ individual, form }) {
  const { isShowingModal } = individual
  const { item } = individual.metadata
  const prevIsShowingModal = usePrevious(isShowingModal)

  useEffect(() => {
    if (item && !form.dirty) {
      form.setValues({
        callSign: item.callSign,
        bloodType: item.bloodType,
        phoneNumber: item.phoneNumber,
        status: item.status
      })
    }
  }, [form, item])

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
          {...formUtils.getInputProps('callSign', form)}
          type="text"
          label="Callsign"
          size="default"
        />
        <Select
          {...formUtils.getSelectProps('bloodType', form)}
          noMargin
          label="Bloodtype"
          placeholder="Select your type..."
        >
          <Select.Option value="A+">A+</Select.Option>
          <Select.Option value="A-">A-</Select.Option>
          <Select.Option value="B+">B+</Select.Option>
          <Select.Option value="B-">B-</Select.Option>
          <Select.Option value="AB+">AB+</Select.Option>
          <Select.Option value="O+">O+</Select.Option>
          <Select.Option value="O-">O-</Select.Option>
        </Select>
        <Input
          {...formUtils.getInputProps('phoneNumber', form)}
          type="tel"
          leftIcon="phone"
          placeholder="Type your phone..."
          label="Phone"
        />
        <Select
          {...formUtils.getSelectProps('status', form)}
          noMargin
          label="Status"
          placeholder="Select your status..."
        >
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="broken">Broken</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
        </Select>
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
