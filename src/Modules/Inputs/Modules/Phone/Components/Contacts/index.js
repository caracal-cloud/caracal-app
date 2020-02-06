/** @jsx jsx */
import { jsx } from 'theme-ui'
import uuid from 'uuid/v4'

import { Table } from 'Modules/Core'

const columns = [
  {
    width: 150,
    title: 'Phone number',
    key: 'phoneNumber',
    render: item => {
      return <span>{item.otherPhone.phoneNumber}</span>
    }
  },

  {
    title: 'Name',
    key: 'name',
    render: item => {
      return <span>{item.otherPhone.name}</span>
    }
  }
]

export const Contacts = ({ data }) => {
  return (
    <Table
      rowKey={() => uuid()}
      columns={columns}
      dataSource={data}
      size="large"
      sx={{
        '.ant-pagination': {
          px: 3
        }
      }}
    />
  )
}
