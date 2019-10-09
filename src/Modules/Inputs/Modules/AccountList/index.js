/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Formik } from 'formik'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Table, Button, Modal } from 'Modules/Core'

import { useIndividual } from './Hooks/useIndividual'
import { useAccount } from './Hooks/useAccount'
import { useTable } from './Hooks/useTable'
import { useList, getData } from './Hooks/useList'

import { EditAccountModal } from 'Modules/Inputs/Components/EditAccountModal'
import { IndividualForm } from './Components/IndividualForm'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Sources', to: '/inputs' },
  { text: 'Collars', to: '/inputs/collars' },
  { text: 'Account List' }
]

export function AccountList(props) {
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
    <PrivateLayout title="Account List" breadcrumbs={breadcrumbs}>
      <EditAccountModal account={account} />
      <Modal
        title={individual.metadata.modalTitle}
        visible={individual.metadata.isShowingModal}
        onCancel={individual.handleCloseModal}
        footer={null}
      >
        <Formik {...individual.formOpts} onSubmit={individual.handleSubmit}>
          {form => <IndividualForm individual={individual} form={form} />}
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
          pageSize: 12,
          size: 'small',
          total: getData('count', list),
          onChange: list.handleChangePage
        }}
        title={() => (
          <Table.Title
            icon="unordered-list"
            rightElement={
              <Button
                icon="ellipsis"
                shape="round"
                intent="link"
                onClick={account.handleEditSettings}
              />
            }
          >
            Elephants - Orbcomm
          </Table.Title>
        )}
      />
    </PrivateLayout>
  )
}
