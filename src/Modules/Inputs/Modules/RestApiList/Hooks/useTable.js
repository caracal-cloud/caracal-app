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
        title: 'Device ID',
        dataIndex: 'deviceId',
        key: 'deviceId'
      },
      {
        width: 200,
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        width: 200,
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
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
