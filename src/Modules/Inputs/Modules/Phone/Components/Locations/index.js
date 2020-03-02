/** @jsx jsx */
import { jsx } from 'theme-ui'
import { format } from 'date-fns'

import * as api from '../../Api'
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
    title: 'Cordinates (lon, lat)',
    key: 'cordinates',
    render: item => {
      return (
        <span>
          {item.longitude}, {item.latitude}
        </span>
      )
    }
  },
  {
    title: 'Accuracy (meters)',
    key: 'accuracy',
    render: item => {
      return <span>{item.accuracyM}</span>
    }
  }
]

export const Locations = ({ uid }) => {
  return (
    <ResourceTable
      columns={columns}
      fetchResource={async ctx => {
        const res = await api.getLocations(uid, ctx.page)
        return res.data
      }}
    />
  )
}
