/** @jsx jsx */
import { jsx } from 'theme-ui'

export function Divider({ gap, direction, ...props }) {
  return (
    <div
      sx={{
        display: 'inline-block',
        bg: 'border',
        ...(direction === 'horizontal'
          ? {
              my: gap,
              height: '1px',
              width: '100%'
            }
          : {
              mx: gap,
              minHeight: '100%',
              width: '1px'
            })
      }}
      {...props}
    />
  )
}

Divider.defaultProps = {
  gap: 2,
  direction: 'horizontal'
}
