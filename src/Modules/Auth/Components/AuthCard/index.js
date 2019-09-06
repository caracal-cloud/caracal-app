/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'

import { Card, Icon } from 'Modules/Core'
import * as styles from './styles'

function Header(props) {
  return (
    <div sx={styles.header.wrapper}>
      <Icon type={props.icon} size={50} color="blue.2" />
      <Styled.h2 sx={styles.header.title}>{props.title}</Styled.h2>
    </div>
  )
}

function Body(props) {
  return <div sx={styles.body.wrapper}>{props.children}</div>
}

function Footer(props) {
  return <div sx={styles.footer.wrapper}>{props.children}</div>
}

export function AuthCard(props) {
  return <Card {...props} />
}

AuthCard.Header = Header
AuthCard.Body = Body
AuthCard.Footer = Footer
