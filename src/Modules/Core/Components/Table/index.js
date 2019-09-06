/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Table as BaseTable } from 'antd'

import { BoxTitle } from 'Modules/Core'
import * as styles from './styles'

function TableTitle(props) {
  return <BoxTitle {...props} />
}

export function Table(props) {
  return <BaseTable sx={styles.table} {...props} />
}

Table.defaultProps = {
  size: 'small'
}

Table.Title = TableTitle
