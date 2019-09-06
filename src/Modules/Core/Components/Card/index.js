/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card as BaseCard, Spin } from 'antd'

import { BoxTitle } from 'Modules/Core'
import * as styles from './styles'

export function Card({
  children,
  title,
  titleRight,
  loading,
  maxHeight,
  ...props
}) {
  return (
    <BaseCard
      sx={styles.wrapper(maxHeight)}
      {...props}
      {...(title && {
        title: (
          <BoxTitle icon={props.icon} rightElement={titleRight}>
            {title}
          </BoxTitle>
        )
      })}
    >
      {loading && (
        <div sx={styles.overlay}>
          <Spin />
        </div>
      )}
      {children}
    </BaseCard>
  )
}
