/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Popconfirm } from 'antd'

import { Button, List } from 'Modules/Core'
import * as styles from './styles'

export function ItemCard({ onDelete, onView, ...props }) {
  return (
    <List.Item
      rightItem={
        <Button.Group>
          {onDelete && (
            <Popconfirm
              title="Are you sure delete this?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button icon="delete" intent="default" />
            </Popconfirm>
          )}
          {onView && <Button icon="eye" intent="default" onClick={onView} />}
        </Button.Group>
      }
    >
      <div sx={styles.title}>{props.title}</div>
      {props.label}
    </List.Item>
  )
}
