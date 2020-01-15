/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Redirect, Router, Link } from '@reach/router'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Grid, Menu, Icon } from 'Modules/Core'

import * as styles from './styles'
import { Profile } from './Modules/Profile'
import { Alerts } from './Modules/Alerts'

const breadcrumbs = [
  {
    icon: 'home',
    to: '/'
  },
  {
    text: 'Settings'
  }
]

const activeMenu = location => {
  const pathname = location && location.pathname.match(/(\/settings\/)(\w+)/)
  return pathname ? { selectedKeys: [pathname[2]] } : null
}

export function Settings({ location }) {
  return (
    <PrivateLayout title="Settings" breadcrumbs={breadcrumbs}>
      <Grid
        gridGap={4}
        gridTemplateColumns={['minmax(300px, 1fr)', '1fr', '200px 450px']}
        gridTemplateRows={['auto auto', 'auto auto', '1fr']}
      >
        <Menu sx={styles.menu} {...activeMenu(location)}>
          <Menu.Item key="profile">
            <Link to="./profile">
              <Icon type="user" />
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="alerts">
            <Link to="./alerts">
              <Icon type="alert" />
              Alerts
            </Link>
          </Menu.Item>
        </Menu>
        <Router>
          <Profile path="/profile" />
          <Alerts path="/alerts" />
          <Redirect from="/" to="/settings/profile" noThrow />
        </Router>
      </Grid>
    </PrivateLayout>
  )
}
