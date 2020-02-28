/** @jsx jsx */
import { jsx } from 'theme-ui'
import { format } from 'date-fns'

import * as api from '../../Api'
import { Badge } from 'Modules/Core'
import { ResourceTable } from '../ResourceTable'

const columns = [
  {
    width: 150,
    title: 'Date',
    dataIndex: 'datetimeRecorded',
    key: 'date',
    render: text => {
      if (!text) return null
      return <span>{format(new Date(text), 'yyyy/MM/dd hh:mm')}</span>
    }
  },
  {
    width: 150,
    title: 'Phone number',
    key: 'phoneNumber',
    render: item => {
      return <span>{item.otherPhone.phoneNumber}</span>
    }
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message'
  },
  {
    title: 'Type',
    key: 'type',
    render: ({ isSent }) => {
      return (
        <Badge type={isSent ? 'success' : 'info'}>
          {isSent ? 'Sent' : 'Received'}
        </Badge>
      )
    }
  }
]

export const Texts = ({ uid }) => {
  return (
    <ResourceTable
      columns={columns}
      fetchResource={async ctx => {
        const res = await api.getTexts(uid, ctx.page)
        return res.data
      }}
    />
  )
}
