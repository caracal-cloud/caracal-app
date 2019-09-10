/** @jsx jsx */
import * as React from 'react'
import { jsx } from 'theme-ui'
import { Formik } from 'formik'
import { Empty, Pagination } from 'antd'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { ItemCard } from 'Modules/Inputs/Components/ItemCard'
import { AddButton } from 'Modules/Inputs'

import {
  Card,
  List,
  Grid,
  Select,
  Divider,
  Badge,
  Input,
  Modal,
  formUtils
} from 'Modules/Core'

import { StorageCheckbox } from '../../Components/StorageCheckbox'
import { AddModalFooter } from '../../Components/AddModalFooter'
import { useCollarsAccounts } from './Hooks/useCollarsAccounts'
import { useAddOrbcomm } from './Hooks/useAddOrbcomm'
import { useAddSavannah } from './Hooks/useAddSavannah'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Inputs', to: '/inputs' },
  { text: 'Collars' }
]

const types = {
  healthy: 'success',
  unhealthy: 'error',
  pending: 'warning'
}

export function Collars() {
  const accounts = useCollarsAccounts()
  const addProps = {
    type: accounts.metadata.specie,
    onAdd: accounts.handleReload
  }

  const orbcomm = useAddOrbcomm(addProps)
  const savannah = useAddSavannah(addProps)

  return (
    <PrivateLayout title="Collars" breadcrumbs={breadcrumbs}>
      <Modal
        title="Adding Orbcomm"
        onCancel={orbcomm.handleClose}
        visible={orbcomm.metadata.isShowing}
        footer={null}
      >
        <Formik
          {...orbcomm.formOpts}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <Grid gap={3} gridTemplateColumns="repeat(2, 1fr)">
                <Select
                  {...formUtils.getSelectProps('orbcommTimezone', form)}
                  showSearch
                  noMargin
                  size="large"
                  label="Timezone"
                  placeholder="Select your timezone..."
                >
                  {orbcomm.metadata.timezones.map(timezone => (
                    <Select.Option key={timezone} value={timezone}>
                      {timezone}
                    </Select.Option>
                  ))}
                </Select>
                <Input
                  {...formUtils.getInputProps('orbcommCompanyId', form)}
                  type="text"
                  label="Company ID"
                  placeholder="You company id..."
                />
              </Grid>
              <StorageCheckbox {...form} />
              <AddModalFooter
                disabled={!form.dirty}
                loading={orbcomm.metadata.isAdding}
                onCancel={orbcomm.handleClose}
              />
            </form>
          )}
        />
      </Modal>
      <Modal
        title="Adding Savannah"
        onCancel={savannah.handleClose}
        visible={savannah.metadata.isShowing}
        footer={null}
      >
        <Formik
          {...savannah.formOpts}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <Grid gap={3} gridTemplateColumns="repeat(2, 1fr)">
                <Input
                  {...formUtils.getInputProps('savannahTrackingUsername', form)}
                  noMargin
                  type="text"
                  leftIcon="user"
                  label="Username"
                  placeholder="Your username..."
                />
                <Input
                  {...formUtils.getInputProps('savannahTrackingPassword', form)}
                  noMargin
                  type="password"
                  leftIcon="lock"
                  label="Password"
                  placeholder="Your password..."
                />
              </Grid>
              <StorageCheckbox {...form} />
              <AddModalFooter
                disabled={!form.dirty}
                loading={savannah.metadata.isAdding}
                onCancel={savannah.handleClose}
              />
            </form>
          )}
        />
      </Modal>
      <Grid
        gridGap={4}
        gridTemplateColumns={['1fr', '1fr', '1.5fr 1fr', '600px 400px']}
      >
        <Card title="Add New Account" icon="plus-square">
          <Grid gridGap={2} gridTemplateColumns="repeat(auto-fit, 150px)">
            <AddButton onClick={orbcomm.handleOpen}>
              Orbcomm / Skygistics
            </AddButton>
            <AddButton onClick={savannah.handleOpen}>
              Savannah Tracking
            </AddButton>
          </Grid>
          <Divider gap={3} />
          <Select
            size="large"
            label="Species"
            placeholder="Select the specie..."
            defaultValue="elephant"
            value={accounts.metadata.specie}
            onChange={accounts.handleSelectSpecie}
          >
            <Select.Option value="elephant">Elephant</Select.Option>
            <Select.Option value="girafe">Girafe</Select.Option>
            <Select.Option value="rhinoceros">Rhinoceros</Select.Option>
          </Select>
        </Card>
        <Card title="Current Accounts" icon="unordered-list">
          <List loading={accounts.metadata.isLoading}>
            {accounts.metadata.isEmpty ? (
              <Empty />
            ) : (
              accounts.metadata.hasResults &&
              accounts.metadata.results.map(account => (
                <ItemCard
                  key={account.uid}
                  title={account.title}
                  onDelete={accounts.handleDelete(account)}
                  onView={accounts.handleView(account)}
                  label={
                    <Badge type={types[account.status]}>{account.status}</Badge>
                  }
                />
              ))
            )}
          </List>
          {accounts.metadata.hasResults && (
            <React.Fragment>
              <Divider />
              <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  defaultCurrent={1}
                  pageSize={3}
                  size="small"
                  total={accounts.metadata.count}
                  onChange={accounts.handleChangePage}
                />
              </div>
            </React.Fragment>
          )}
        </Card>
      </Grid>
    </PrivateLayout>
  )
}
