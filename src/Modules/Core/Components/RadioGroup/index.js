/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import BaseRadioGroup from 'antd/lib/radio/group'

export function RadioGroup(props) {
  return (
    <div
      {...(props.vertical && {
        sx: {
          '.ant-checkbox-wrapper ~ .ant-checkbox-wrapper': {
            m: '0',
            mt: 1
          }
        }
      })}
    >
      <Styled.h4>{props.label}</Styled.h4>
      <BaseRadioGroup {...props}>{props.children}</BaseRadioGroup>
    </div>
  )
}
