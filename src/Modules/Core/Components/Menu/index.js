/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Menu as BaseMenu } from 'antd'

import theme from 'Theme'

export function Menu(props) {
  return (
    <BaseMenu
      {...props}
      sx={{
        py: 2,
        '.ant-menu-item': {
          margin: `0 !important`
        }
      }}
      style={{
        borderRadius: theme.radii.radius,
        boxShadow: theme.shadows[1].slice(0, -1)
      }}
    />
  )
}

Menu.Item = BaseMenu.Item
Menu.ItemGroup = BaseMenu.ItemGroup
Menu.SubMenu = BaseMenu.SubMenu
