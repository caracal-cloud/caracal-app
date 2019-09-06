/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Badge } from 'Modules/Core'

const statuses = {
  online: 'success',
  offline: 'warning'
}

export function Status({ status }) {
  return (
    <div sx={{ display: 'flex', alignItems: 'center' }}>
      <div sx={{ fontSize: 1, color: 'gray.2', mr: 2 }}>Status:</div>
      <Badge type={statuses[status]}>{status}</Badge>
    </div>
  )
}

Status.defaultProps = {
  status: 'offline'
}
