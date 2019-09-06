/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button, Spin } from 'antd'

import * as styles from './styles'

export function AddButton({ icon, loading, ...props }) {
  return (
    <Button sx={styles.wrapper} type="dashed" {...props} disabled={loading}>
      {loading ? <Spin /> : icon}
      {props.children}
    </Button>
  )
}
