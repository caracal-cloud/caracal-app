/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Modal as BaseModal } from 'antd'

function Footer(props) {
  return (
    <div
      {...props}
      sx={{
        mt: 3,
        textAlign: 'right',
        '> *': {
          ml: 2
        }
      }}
    >
      {props.children}
    </div>
  )
}

export function Modal(props) {
  return <BaseModal {...props} />
}

Modal.Footer = Footer
