/** @jsx jsx */
import { jsx } from 'theme-ui'

import * as styles from './styles'

export function Badge(props) {
  return <div sx={styles.wrapper(props.type)}>{props.children}</div>
}
