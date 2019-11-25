/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Input as BaseInput } from 'antd'

import { Icon } from 'Modules/Core'
import * as styles from './styles'

export function Input({ error, label, leftIcon, large, noMargin, ...props }) {
  const Component = props.type === 'password' ? BaseInput.Password : BaseInput
  return (
    <div sx={styles.formGroup(noMargin, error)}>
      {label && <div sx={styles.label(error)}>{label}</div>}
      <Component
        {...props}
        {...(leftIcon && {
          prefix: <Icon type={leftIcon} size={14} color="gray.4" />
        })}
        size={large ? 'large' : props.size || 'default'}
      />
      {error && <div sx={styles.error}>{error}</div>}
    </div>
  )
}

Input.defaultProps = {
  size: 'large'
}
