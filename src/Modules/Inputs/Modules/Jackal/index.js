/** @jsx jsx */
import * as R from 'ramda'
import { jsx } from 'theme-ui'
import { Formik } from 'formik'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Table, Button, Modal } from 'Modules/Core'
import { EditAccountModal } from 'Modules/Inputs/Components/EditAccountModal'

import { PhoneModalForm } from './Components/PhoneModalForm'
import { usePhoneList, getData } from './Hooks/usePhoneList'
import { useTable } from './Hooks/useTable'
import { usePhone } from './Hooks/usePhone'
import { useAccount } from './Hooks/useAccount'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Sources' },
  { text: 'Jackal' }
]

export function Jackal(props) {
  const { id: uid } = props
  const account = useAccount({ uid })
  const list = usePhoneList({ uid })

  const phone = usePhone({
    onUpdateSuccess: list.handleReload
  })

  const table = useTable({
    onEditItem: phone.handleOpenModal
  })

  return (
    <PrivateLayout title="Jackal" breadcrumbs={breadcrumbs}>

      <div sx={{ width: "98%", textAlign: 'right', fontSize: 1, mb: 1, mr: 1 }}>
        <a href={R.path(['metadata', 'data', 'csvUrl'], account)}>
          Download Excel
        </a>
      </div>

      <EditAccountModal account={account} />
      <Modal
        title={phone.metadata.modalTitle}
        visible={phone.metadata.isShowingModal}
        onCancel={phone.handleCloseModal}
        footer={null}
      >
        <Formik {...phone.formOpts} onSubmit={phone.handleSubmit}>
          {form => <PhoneModalForm phone={phone} form={form} />}
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
            Phones
          </Table.Title>
        )}
      />
    </PrivateLayout>
  )
}
