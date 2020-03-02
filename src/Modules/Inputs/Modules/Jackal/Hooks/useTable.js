/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useMemo } from 'react'
import dayjs from 'dayjs'

import { Button, Badge } from 'Modules/Core'
import { Link } from '@reach/router'

export function useTable({ onEditItem } = { onEditItem: () => null }) {
  const columns = useMemo(
    () => [
      {
        width: 200,
        title: 'ID',
        key: 'deviceId',
        render: item => {
          return <Link to={item.uid}>{item.deviceId}</Link>
        }
      },
      {
        width: 200,
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text = '---') => text
      },
      {
        width: 200,
        title: 'Phone number',
        dataIndex: 'phoneNumbers',
        key: 'phoneNumber',
        render: text => text || '---'
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
      /*
      {
        title: 'Distance 24h',
        dataIndex: 'distanceDay',
        key: 'distanceDay',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.distanceDay - b.distanceDay,
        render: text => (text ? `${text} km` : '---')
      },
      */
      {
        width: 100,
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => (
          <div sx={{ display: 'flex', justifyContent: 'center' }}>
            <Badge type={text === 'deployed' ? 'success' : 'warning'}>
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
