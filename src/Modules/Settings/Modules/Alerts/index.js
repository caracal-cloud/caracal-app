/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

import {
  List,
  Card,
  Button,
  Icon,
  Modal,
  Grid,
  RadioGroup,
  Radio,
  Input,
  PopConfirm,
  formUtils
} from 'Modules/Core'

import * as styles from './styles'
import { useRecipients } from './Hooks/useRecipients'
import { useAddModal } from './Hooks/useAddModal'

export const Alerts = () => {
  const recipients = useRecipients()
  const addModal = useAddModal({
    onAddOrDelete: recipients.handleReload
  })

  const { form } = addModal
  const { isPhoneSelected } = addModal.metadata
  const inputType = isPhoneSelected ? 'Phone' : 'Email'

  return (
    <Fragment>
      <Modal
        title="Adding Recipient"
        visible={addModal.metadata.isOpened}
        onCancel={addModal.handleClose}
        footer={null}
      >
        <form onSubmit={form.handleSubmit}>
          <Grid gridGap={4} gridTemplateColumns="auto 1fr">
            <RadioGroup {...formUtils.getRadioProps('type', form)} label="Type">
              <Radio value="phone">Phone</Radio>
              <Radio value="email">Email</Radio>
            </RadioGroup>
            <Input
              {...formUtils.getInputProps('value', form)}
              sx={{ mt: '6px' }}
              type={inputType}
              leftIcon={isPhoneSelected ? 'phone' : 'mail'}
              placeholder={`${inputType}`}
            />
          </Grid>
          <Modal.Footer>
            <Button intent="default" onClick={addModal.handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={addModal.metadata.isAdding}
              disabled={!form.dirty || !form.isValid}
            >
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Card
        title="Alerts"
        icon="alert"
        sx={styles.card}
        loading={recipients.metadata.isLoading}
        titleRight={
          <Button intent="default" onClick={addModal.handleOpen}>
            <Icon type="plus" size={14} color="gray.1" /> Add
          </Button>
        }
      >
        <List
          loading={recipients.metadata.isDeleting}
          dataSource={recipients.metadata.recipientsList}
          renderItem={item => (
            <List.Item
              key={item.uid}
              rightItem={
                <PopConfirm
                  title="Are you sure delete this item?"
                  onConfirm={() => recipients.handleDelete(item.uid)}
                  onCancel={() => null}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button shape="circle" intent="danger" size="small">
                    <Icon type="delete" />
                  </Button>
                </PopConfirm>
              }
            >
              {item.email || item.phoneNumber}
            </List.Item>
          )}
        />
      </Card>
    </Fragment>
  )
}
