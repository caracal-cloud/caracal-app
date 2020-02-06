/** @jsx jsx */
import { jsx } from 'theme-ui'
import { format, addSeconds } from 'date-fns'
import uuid from 'uuid/v4'

import { Table, Badge } from 'Modules/Core'

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

export const Calls = ({ data }) => {
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
