/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Button } from 'Modules/Core'
import { useLogout } from 'Modules/Auth'

import * as styles from './styles'
import { SidebarLink } from './Components/SidebarLink'
import { useInputsMenuItems } from './Hooks/useInputsMenuItems'

export function Sidebar(props) {
  const { logout } = useLogout()
  const inputsMenuItems = useInputsMenuItems()

  return (
    <div className={props.className} sx={styles.wrapper}>
      <div sx={styles.menu}>
        <SidebarLink icon="dashboard" to="/dashboard">
          Dashboard
        </SidebarLink>
        <SidebarLink icon="global" to="/map">
          Map
        </SidebarLink>
        <SidebarLink to="/inputs" icon="download" menuItems={inputsMenuItems}>
          Sources
        </SidebarLink>
        <SidebarLink
          to="/outputs"
          icon="upload"
          menuItems={[
            { text: 'ArcGIS Online', to: '/outputs/arcgis-online' },
            { text: 'Google Earth', to: '/outputs/google-earth' }
          ]}
        >
          Destinations
        </SidebarLink>
        <SidebarLink icon="setting" to="/settings">
          Settings
        </SidebarLink>
      </div>
      <div sx={styles.footer}>
        <Button
          ghost
          sx={styles.logoutBtn}
          icon="logout"
          intent="default"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
