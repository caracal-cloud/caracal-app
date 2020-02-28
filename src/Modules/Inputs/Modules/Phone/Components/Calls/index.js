/** @jsx jsx */
import { jsx } from 'theme-ui'
import { format, addSeconds } from 'date-fns'

import * as api from '../../Api'
import { Badge } from 'Modules/Core'
import { ResourceTable } from '../ResourceTable'

function formattedTime(seconds) {
  var helperDate = addSeconds(new Date(0), seconds)
  return format(helperDate, 'mm:ss')
}

const columns = [
  {
    title: 'Date',
    dataIndex: 'datetimeRecorded',
    key: 'date',
    render: text => {
      if (!text) return null
      return <span>{format(new Date(text), 'yyyy/MM/dd hh:mm')}</span>
    }
  },
  {
    title: 'Phone number',
    key: 'phoneNumbers',
    render: item => {
      return <span>{item.otherPhone.phoneNumber}</span>
    }
  },
  {
    title: 'Duration',
    key: 'duration',
    render: item => {
      return <span>{formattedTime(item.durationSecs)}</span>
    }
  },
  {
    title: 'Type',
    key: 'type',
    render: ({ isSent }) => {
      return (
        <Badge type={isSent ? 'success' : 'info'}>
          {isSent ? 'Outgoing' : 'Incoming'}
        </Badge>
      )
    }
  }
]

export const Calls = ({ uid }) => {
  return (
    <ResourceTable
      columns={columns}
      fetchResource={async ctx => {
        const res = await api.getCalls(uid, ctx.page)
        return res.data
      }}
    />
  )
}
