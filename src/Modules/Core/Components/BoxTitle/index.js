/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'

import { Icon } from 'Modules/Core'
import * as styles from './styles'

export function BoxTitle(props) {
  return (
    <div sx={{ display: 'flex' }}>
      <Styled.h3 sx={styles.title(props.color)}>
        {props.icon && <Icon type={props.icon} size={18} />}
        <span sx={{ ml: 2 }}>{props.children}</span>
      </Styled.h3>
      {props.rightElement}
    </div>
  )
}
