/** @jsx jsx */
import * as React from 'react'
import { jsx } from 'theme-ui'
import { Empty, Pagination, message } from 'antd'
import { CopyBlock } from 'react-code-blocks'
import { github as theme } from 'react-code-blocks'
import copy from 'copy-text-to-clipboard'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { ItemCard } from 'Modules/Inputs/Components/ItemCard'
import { useCustomSources } from './Hooks/useCustomSources'
import { useAddCustomSource } from './Hooks/useAddCustomSource'

import {
  Badge,
  Card,
  Divider,
  Grid,
  Input,
  List,
  Modal,
  formUtils
} from 'Modules/Core'
import { StorageCheckbox } from '../../Components/StorageCheckbox'
import { AddModalFooter } from '../../Components/AddModalFooter'

import { AddButton } from 'Modules/Inputs'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Sources' },
  { text: 'REST API' }
]

const types = {
  healthy: 'success',
  unhealthy: 'error',
  pending: 'warning'
}

const code = `# Step 1: Obtain access and refresh tokens
curl --request POST 'https://api.caracal.cloud/account/login/' 
--form 'email=YOUR_EMAIL' \
--form 'password=YOUR_PASSWORD'

# Step 2 (optional): Refresh access token
curl --request POST 'https://api.caracal.cloud/account/refresh/' 
--form 'refresh_token=YOUR_REFRESH_TOKEN'

# Step 3: Add a record
curl --request POST 'https://api.caracal.cloud/source/add_record/' 
--header 'Authorization: JWT YOUR_ACCESS_TOKEN'
--header 'Content-Type: application/json' 
--data-raw '{
	"write_key": "YOUR_WRITE_KEY",
	"datetime_recorded": "2020-01-01 10:20:30",
	"lat": 3.141592,
	"lon": 6.535897,
	"device_id": "YOUR_DEVICE_ID",
	"alt_m": 5.00,
	"speed_kmh": 10.00,
	"temp_c": 20.00
}
`

export function RestApi() {
  const sources = useCustomSources()

  console.log(sources)

  const addProps = {
    onAdd: sources.handleReload
  }
  const addCustomSource = useAddCustomSource(addProps)

  function handleCopy(writeKey) {
    copy(writeKey)
    message.info('Write key copied to clipboard')
  }

  return (
    <PrivateLayout title="REST API" breadcrumbs={breadcrumbs}>
      <Modal
        title="Adding Custom Source"
        onCancel={addCustomSource.handleClose}
        visible={addCustomSource.metadata.isShowing}
        footer={null}
      >
        <form onSubmit={addCustomSource.form.handleSubmit}>
          <Grid gap={3} gridTemplateColumns="1fr 1.5fr">
            <Input
              {...formUtils.getInputProps('name', addCustomSource.form)}
              type="text"
              label="Title"
              placeholder="The source's title..."
            />
            <Input
              {...formUtils.getInputProps('description', addCustomSource.form)}
              type="text"
              label="Description"
              placeholder="The source's description..."
            />
          </Grid>
          <StorageCheckbox {...addCustomSource.form} />
          <AddModalFooter
            disabled={!addCustomSource.form.dirty}
            loading={addCustomSource.metadata.isAdding}
            onCancel={addCustomSource.handleClose}
          />
        </form>
      </Modal>

      <Grid
        gridGap={4}
        gridTemplateColumns={['1fr', '1fr', '1.5fr 1fr', '600px 400px']}
      >
        <Card title="Add New Account" icon="plus-square">
          <AddButton onClick={addCustomSource.handleOpen}>
            Get API Key
          </AddButton>
        </Card>
        <Card title="Current Sources" icon="unordered-list" maxHeight={350}>
          <List loading={sources.metadata.isLoading}>
            {sources.metadata.isEmpty ? (
              <Empty />
            ) : (
              sources.metadata.hasResults &&
              sources.metadata.results.map(account => (
                <ItemCard
                  key={account.uid}
                  title={account.name}
                  onDelete={sources.handleDelete(account)}
                  onView={sources.handleView(account)}
                  onCopy={() => handleCopy(account.writeKey)}
                  label={<Badge type="success">Active</Badge>}
                />
              ))
            )}
          </List>
          {sources.metadata.hasResults && (
            <React.Fragment>
              <Divider />
              <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  defaultCurrent={1}
                  pageSize={3}
                  size="small"
                  total={sources.metadata.count}
                  onChange={sources.handleChangePage}
                />
              </div>
            </React.Fragment>
          )}
        </Card>

        <Card>
          <CopyBlock
            text={code}
            language="python"
            showLineNumbers={false}
            theme={theme}
            wrapLines
          />
        </Card>
      </Grid>
    </PrivateLayout>
  )
}
