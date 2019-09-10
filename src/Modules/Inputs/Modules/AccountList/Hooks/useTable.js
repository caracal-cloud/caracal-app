/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useMemo } from 'react'
import humanize from 'humanize-string'
import dayjs from 'dayjs'

import { Button, Badge, Icon } from 'Modules/Core'

export function useTable({ onEditItem }) {
  const columns = useMemo(
    () => [
      {
        width: 200,
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        width: 100,
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
        render: text => {
          const icon = text === 'female' ? 'woman' : 'man'
          return <Icon type={icon} sx={{ fontSize: 25 }} />
        }
      },
      {
        width: 100,
        title: 'Type',
        dataIndex: 'subtype',
        key: 'subtype',
        render: text => (text ? humanize(text) : '---')
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
        title: 'Distance 24h',
        dataIndex: 'distanceDay',
        key: 'distanceDay',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.distanceDay - b.distanceDay,
        render: text => `${text} km`
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
