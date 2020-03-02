/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button, Spin } from 'antd'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Card, Grid, Icon } from 'Modules/Core'

import * as styles from './styles'
import { Status } from './Components/Status'
import { useArcgis } from './Hooks/useArcgis'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Destinations', to: '/outputs' },
  { text: 'ArcGIS Online' }
]

export function ArcgisOnline() {
  const arcgis = useArcgis()
  const { metadata } = arcgis
  return (
    <PrivateLayout title="Arcgis Online" breadcrumbs={breadcrumbs}>
      <Grid gridTemplateColumns={['minmax(300px, 1fr)', '1fr', '450px']}>
        <Card
          sx={styles.card}
          icon="setting"
          title="Configuration"
          titleRight={
            !metadata.isChecking && <Status status={metadata.status} />
          }
        >
          {metadata.isChecking && <Spin />}
          {!metadata.isChecking &&
            metadata.isOffline &&
            !metadata.isConnecting && (
              <Button
                size="large"
                onClick={arcgis.handleConnect}
                loading={metadata.isLoading}
              >
                Connect
              </Button>
            )}
          {!metadata.isChecking && metadata.isOnline && (
            <div sx={styles.profile}>
              <Icon type="user" sx={styles.profileIcon} />
              <h3 sx={styles.profileName}>{metadata.data.username}</h3>
              <Button
                size="large"
                onClick={arcgis.handleDisconnect}
                loading={metadata.isDisconnecting}
              >
                Disconnect
              </Button>
            </div>
          )}
        </Card>
      </Grid>
    </PrivateLayout>
  )
}
