/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Metadata, Icon, List } from 'Modules/Core'
import * as styles from './styles'

export function EventCard(props) {
  return (
    <List.Item
      leftItem={
        <div sx={styles.iconWrapper}>
          <Icon sx={styles.icon(props.type)} type="warning" size={50} />
        </div>
      }
    >
      <Metadata date={props.date} hour={props.hour} />
      <List.ItemText>{props.message}</List.ItemText>
    </List.Item>
  )
}

EventCard.defaultProps = {
  type: 'none'
}
