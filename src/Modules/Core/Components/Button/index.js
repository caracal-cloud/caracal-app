/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button as BaseButton } from 'antd'

export function Button(props) {
  return <BaseButton {...props} htmlType={props.type} type={props.intent} />
}

Button.Group = BaseButton.Group

Button.defaultProps = {
  htmlType: 'button',
  intent: 'primary'
}
