/** @jsx jsx */
import { jsx } from 'theme-ui'
import { v4 as uuid } from 'uuid'
import { useMachine } from '@xstate/react'

import { Table } from 'Modules/Core'
import { phoneResourceMachine } from '../../Machines/phoneResource'

export const ResourceTable = ({ fetchResource, columns }) => {
  const [state, send] = useMachine(
    phoneResourceMachine.withConfig({
      services: {
        fetchResource
      }
    })
  )

  const { data } = state.context
  const isLoading = state.matches('fetching.loading')

  function handleChangePage(page) {
    send('CHANGE_PAGE', { data: { page } })
  }

  return (
    <Table
      loading={isLoading}
      rowKey={() => uuid()}
      columns={columns}
      dataSource={data.results}
      size="large"
      sx={{
        '.ant-pagination': {
          px: 3
        }
      }}
      pagination={{
        defaultCurrent: 1,
        pageSize: 10,
        size: 'small',
        total: data.count,
        onChange: handleChangePage
      }}
    />
  )
}
