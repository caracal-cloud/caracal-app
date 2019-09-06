/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as styles from './styles'

export function PublicLayout(props) {
  return (
    <div sx={styles.wrapper}>
      <main sx={styles.content}>{props.children}</main>
    </div>
  )
}
