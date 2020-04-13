/** @jsx jsx */
import * as React from 'react'
import { jsx } from 'theme-ui'
import { Formik } from 'formik'
import { Empty, Pagination } from 'antd'
import dayjs from 'dayjs'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Card, List, Grid, Modal, Divider } from 'Modules/Core'
import { ItemCard } from 'Modules/Inputs/Components/ItemCard'
import { AddButton } from 'Modules/Inputs'

import { StorageCheckbox } from '../../Components/StorageCheckbox'
import { AddModalFooter } from '../../Components/AddModalFooter'
import { useAddSystem } from './Hooks/useAddOrbcomm'
import { useRadiosSystems } from './Hooks/useRadiosSystems'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Sources' },
  { text: 'Radios' }
]

export function Radios() {
  const systems = useRadiosSystems()
  const system = useAddSystem({ onAdd: systems.handleReload })

  return (
    <PrivateLayout title="Radios" breadcrumbs={breadcrumbs}>
      <Modal
        title="Adding TRBOnet"
        onCancel={system.handleClose}
        visible={system.metadata.isShowing}
        footer={null}
      >
        <Formik {...system.formOpts}>
          {props => (
            <form onSubmit={props.handleSubmit}>
              <StorageCheckbox {...props} sx={{ mt: 0 }} />
              <AddModalFooter
                disabled={!props.dirty}
                loading={system.metadata.isAdding}
                onCancel={system.handleClose}
              />
            </form>
          )}
        </Formik>
      </Modal>
      <Grid
        gridGap={4}
        gridTemplateColumns={['1fr', '1fr', '1.5fr 1fr', '600px 400px']}
      >
        <Card title="Add New System" icon="plus-square">
          <Grid gridTemplateColumns="repeat(auto-fit, 150px)">
            <AddButton onClick={system.handleOpen}>TRBOnet</AddButton>
          </Grid>
        </Card>
        <Card title="Current Systems" icon="unordered-list">
          <List loading={systems.metadata.isLoading}>
            {systems.metadata.isEmpty ? (
              <Empty />
            ) : (
              systems.metadata.hasResults &&
              systems.metadata.results.map(system => {
                const date = dayjs(system.datetimeCreated)
                return (
                  <ItemCard
                    key={system.uid}
                    title={system.title}
                    onDelete={systems.handleDelete(system)}
                    onView={systems.handleView(system)}
                    label={
                      <div sx={{ fontSize: 1, color: 'gray' }}>
                        Added {date.format('MMMM DD, YYYY')}
                      </div>
                    }
                  />
                )
              })
            )}
          </List>
          {systems.metadata.hasResults && (
            <React.Fragment>
              <Divider />
              <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  defaultCurrent={1}
                  pageSize={3}
                  size="small"
                  total={systems.metadata.count}
                  onChange={systems.handleChangePage}
                />
              </div>
            </React.Fragment>
          )}
        </Card>
      </Grid>
    </PrivateLayout>
  )
}
