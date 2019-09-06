/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Icon, Divider } from 'Modules/Core'
import * as styles from './styles'

export function Metadata(props) {
  return (
    <div sx={styles.metadata}>
      <div sx={styles.metadataItem}>
        <Icon sx={{ mr: 2 }} type="calendar" size={12} />
        {props.date}
      </div>
      <Divider direction="vertical" sx={{ mx: 2 }} />
      <div sx={styles.metadataItem}>
        <Icon sx={{ mr: 2 }} type="clock-circle" size={12} />
        {props.hour}
      </div>
    </div>
  )
}
