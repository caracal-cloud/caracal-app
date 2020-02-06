/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Tabs as BaseTabs } from 'antd'

export function Tabs(props) {
  return <BaseTabs {...props} />
}

Tabs.TabPane = BaseTabs.TabPane
