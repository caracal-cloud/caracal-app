/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'

export function CheckboxGroup({
  className,
  vertical,
  label,
  children,
  ...props
}) {
  return (
    <div
      {...props}
      className={className}
      {...(vertical && {
        sx: {
          display: 'flex',
          flexDirection: 'column',
          '.ant-checkbox-wrapper ~ .ant-checkbox-wrapper': {
            m: '0',
            mt: 1
          }
        }
      })}
    >
      <Styled.h4>{label}</Styled.h4>
      {children}
    </div>
  )
}
