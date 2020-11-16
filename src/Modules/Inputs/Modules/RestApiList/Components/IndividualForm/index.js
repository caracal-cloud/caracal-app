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
        sex: item.sex,
        status: item.status,
        ...(item.subtype && {
          subtype: item.subtype
        })
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
        <RadioGroup {...formUtils.getRadioProps('sex', form)} label="Sex">
          <Radio value="female">Female</Radio>
          <Radio value="male">Male</Radio>
        </RadioGroup>
        <Select
          {...formUtils.getSelectProps('subtype', form)}
          allowClear
          noMargin
          label="Type"
          placeholder="Select type"
        >
          <Select.Option value="forest">Forest</Select.Option>
          <Select.Option value="hybrid">Hybrid</Select.Option>
          <Select.Option value="savannah">Savannah</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
        <Select
          {...formUtils.getSelectProps('status', form)}
          noMargin
          label="Status"
          placeholder="Select status"
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
