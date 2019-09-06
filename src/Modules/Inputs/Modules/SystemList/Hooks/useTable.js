/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useMemo } from 'react'
import { message } from 'antd'
import copy from 'copy-text-to-clipboard'
import dayjs from 'dayjs'

import { Button, Badge } from 'Modules/Core'

export function useTable({ onEditItem }) {
  const columns = useMemo(
    () => [
      {
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
        width: 100,
        render: text => {
          const abbr = `${text.slice(0, 8)}...`
          const handleCopy = () => {
            copy(text)
            message.info('UID copied to clipboard')
          }
          return (
            <Button intent="link" icon="copy" onClick={handleCopy}>
              {abbr}
            </Button>
          )
        }
      },
      {
        title: 'Callsign',
        dataIndex: 'callSign',
        key: 'callSign'
      },
      {
        title: 'Bloodtype',
        dataIndex: 'bloodType',
        key: 'bloodType'
      },
      {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber'
      },
      {
        title: 'Last reported',
        dataIndex: 'datetimeLastPosition',
        key: 'datetimeLastPosition',
        defaultSortOrder: 'descend',
        sorter: (a, b) => {
          const dateA = dayjs(a.datetimeLastPosition).unix()
          const dateB = dayjs(b.datetimeLastPosition).unix()
          return dateA - dateB
        },
        render: str => {
          const date = dayjs(str)
          return date.format('YYYY-MM-DD HH:mm')
        }
      },
      {
        width: 100,
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => (
          <div sx={{ display: 'flex', justifyContent: 'center' }}>
            <Badge type={text === 'active' ? 'success' : 'warning'}>
              {text}
            </Badge>
          </div>
        )
      },
      {
        width: 50,
        dataIndex: '',
        key: 'x',
        render: item => (
          <Button
            icon="edit"
            shape="round"
            intent="link"
            onClick={onEditItem(item)}
          />
        )
      }
    ],
    [onEditItem]
  )

  return {
    columns
  }
}
