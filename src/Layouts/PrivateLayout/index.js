/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { Breadcrumb } from 'antd'
import { Link } from '@reach/router'

import { Icon } from 'Modules/Core'
import { Sidebar } from 'Modules/Sidebar'
import * as styles from './styles'

export function PrivateLayout(props) {
  return (
    <div sx={styles.wrapper}>
      <Sidebar sx={styles.sidebar} />
      <div sx={styles.header}>
        <Breadcrumb>
          {props.breadcrumbs &&
            props.breadcrumbs.map((item, idx) => (
              <Breadcrumb.Item key={idx}>
                {item.icon && <Icon type={item.icon} size={12} />}
                {item.to ? <Link to={item.to}>{item.text}</Link> : item.text}
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
        <Styled.h1>{props.title}</Styled.h1>
      </div>
      <main sx={styles.main}>{props.children}</main>
    </div>
  )
}
