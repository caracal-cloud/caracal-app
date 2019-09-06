/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Icon as BaseIcon } from 'antd'

export function Icon({ size, color, ...props }) {
  return <BaseIcon {...props} sx={{ fontSize: `${size}px`, color }} />
}

Icon.defaultProps = {
  size: 12
}
