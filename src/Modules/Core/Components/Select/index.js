/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Select as BaseSelect } from 'antd'

import * as styles from './styles'

export function Select({ error, label, children, className, ...props }) {
  return (
    <div className={className} sx={styles.formGroup(props.noMargin)}>
      {label && <div sx={styles.label(error)}>{label}</div>}
      <BaseSelect sx={{ width: '100%' }} {...props}>
        {children}
      </BaseSelect>
      {error && <div sx={styles.error}>{error}</div>}
    </div>
  )
}

Select.Option = BaseSelect.Option
Select.OptGroup = BaseSelect.OptGroup
