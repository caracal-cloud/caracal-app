/** @jsx jsx */
import { jsx } from 'theme-ui'

import * as api from '../../Api'
import { ResourceTable } from '../ResourceTable'

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

export const Contacts = ({ uid }) => {
  return (
    <ResourceTable
      columns={columns}
      fetchResource={async ctx => {
        const res = await api.getContacts(uid, ctx.page)
        return res.data
      }}
    />
  )
}
