/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Formik } from 'formik'
import { Dropdown, Menu } from 'antd'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Table, Button, Modal } from 'Modules/Core'

import { useIndividual } from './Hooks/useIndividual'
import { useAccount } from './Hooks/useAccount'
import { useTable } from './Hooks/useTable'
import { useList, getData } from './Hooks/useList'

import { EditAccountModal } from 'Modules/Inputs/Components/EditAccountModal'
import { SystemForm } from './Components/SystemForm'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Sources', to: '/inputs' },
  { text: 'Radios', to: '/inputs/radios' },
  { text: 'Radio Systems' }
]

export function SystemList(props) {
  const { id: uid } = props
  const account = useAccount({ uid })
  const list = useList({ uid })

  const individual = useIndividual({
    onUpdateSuccess: list.handleReload
  })

  const table = useTable({
    onEditItem: individual.handleOpenModal
  })

  return (
    <PrivateLayout title="System List" breadcrumbs={breadcrumbs}>
      <EditAccountModal account={account} />
      <Modal
        title={individual.metadata.modalTitle}
        visible={individual.metadata.isShowingModal}
        onCancel={individual.handleCloseModal}
        footer={null}
      >
        <Formik {...individual.formOpts} onSubmit={individual.handleSubmit}>
          {form => <SystemForm individual={individual} form={form} />}
        </Formik>
      </Modal>
      <Table
        rowKey="uid"
        bordered
        loading={list.metadata.isLoading}
        dataSource={getData('results', list)}
        columns={table.columns}
        pagination={{
          defaultCurrent: 1,
          pageSize: 3,
          size: 'small',
          total: getData('count', list),
          onChange: list.handleChangePage
        }}
        title={() => (
          <Table.Title
            icon="unordered-list"
            rightElement={
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a href="https://caracal-public-data.s3.amazonaws.com/connector.exe">
                        Download connector
                      </a>
                    </Menu.Item>
                    <Menu.Item onClick={account.handleEditSettings}>
                      Edit settings
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button icon="ellipsis" shape="round" intent="link" />
              </Dropdown>
            }
          >
            Elephants - Orbcomm
          </Table.Title>
        )}
      />
    </PrivateLayout>
  )
}
