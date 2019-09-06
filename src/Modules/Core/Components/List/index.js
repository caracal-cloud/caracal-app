/** @jsx jsx */
import { jsx } from 'theme-ui'
import { List as BaseList } from 'antd'

import * as styles from './styles'

function ListItemText(props) {
  return <div sx={styles.text}>{props.children}</div>
}

function ListItem(props) {
  return (
    <BaseList.Item className={props.className} sx={styles.item.wrapper}>
      {props.leftItem && <div sx={styles.item.left}>{props.leftItem}</div>}
      <div sx={styles.item.content}>{props.children}</div>
      {props.rightItem && <div sx={styles.item.right}>{props.rightItem}</div>}
    </BaseList.Item>
  )
}

export function List(props) {
  return <BaseList sx={styles.wrapper} {...props} />
}

List.Item = ListItem
List.ItemText = ListItemText
