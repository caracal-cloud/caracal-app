/** @jsx jsx */
import * as React from 'react'
import { jsx } from 'theme-ui'
import { Formik } from 'formik'
import { Empty, Pagination } from 'antd'
import dayjs from 'dayjs'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { ItemCard } from 'Modules/Inputs/Components/ItemCard'
import { Card, List, Grid, Modal, Divider } from 'Modules/Core'
import { AddButton } from 'Modules/Inputs'

import { useAddDrive } from './Hooks/useAddDrive'
import { useListDocs } from './Hooks/useListDocs'
import { ReactComponent as GoogleDrive } from './google-drive.svg'
import { FilesList } from './Components/FilesList'
import { SelectOptions } from './Components/SelectOptions'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Sources' },
  { text: 'Cloud Drive' }
]

export function CloudDrive() {
  const docs = useListDocs()
  const addDrive = useAddDrive({ onReload: docs.handleReload })
  const { metadata } = addDrive

  return (
    <PrivateLayout title="Cloud Drive" breadcrumbs={breadcrumbs}>
      <Modal
        title="Add new document"
        visible={metadata.isAdding}
        onCancel={addDrive.handleCloseModal}
        footer={null}
      >
        {(metadata.isListingFiles || metadata.isLoadingSheets) && (
          <FilesList {...addDrive} />
        )}
        {(metadata.isSelectingOptions || metadata.isSubmitting) && (
          <Formik {...addDrive.formOpts} onSubmit={addDrive.handleSubmit}>
            {form => <SelectOptions {...addDrive} form={form} />}
          </Formik>
        )}
      </Modal>
      <Grid
        gridGap={4}
        gridTemplateColumns={['1fr', '1fr', '1.5fr 1fr', '600px 400px']}
      >
        <Card title="Add New Document" icon="plus-square">
          <Grid gridTemplateColumns="repeat(auto-fit, 150px)">
            <AddButton
              loading={metadata.isAuthenticating || metadata.isGettingFiles}
              onClick={addDrive.handleOpenModal}
              icon={
                <div sx={{ mb: 2 }}>
                  <GoogleDrive width={40} height={40} />
                </div>
              }
            >
              Google Drive
            </AddButton>
          </Grid>
        </Card>
        <Card title="Current Documents" icon="unordered-list">
          <List loading={docs.metadata.isLoading}>
            {docs.metadata.isEmpty && <Empty />}
            {docs.metadata.hasResults &&
              docs.metadata.results.map(doc => {
                const date = dayjs(doc.datetimeCreated)
                return (
                  <ItemCard
                    key={doc.uid}
                    title={doc.title}
                    onView={() => window.open(doc.link)}
                    onDelete={docs.handleDelete(doc.uid)}
                    label={
                      <div sx={{ fontSize: 1, color: 'gray' }}>
                        Added {date.format('MM DD, YYYY')}
                      </div>
                    }
                  />
                )
              })}
          </List>
          {docs.metadata.hasResults && (
            <React.Fragment>
              <Divider />
              <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  defaultCurrent={1}
                  pageSize={3}
                  size="small"
                  total={docs.metadata.count}
                  onChange={docs.handleChangePage}
                />
              </div>
            </React.Fragment>
          )}
        </Card>
      </Grid>
    </PrivateLayout>
  )
}
