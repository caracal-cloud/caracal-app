/** @jsx jsx */
import { jsx } from 'theme-ui'

export function Grid({ className, children, ...props }) {
  return (
    <div className={className} sx={{ display: 'grid', ...props }}>
      {children}
    </div>
  )
}
