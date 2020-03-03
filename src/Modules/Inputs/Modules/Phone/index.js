/** @jsx jsx */
import * as R from 'ramda'
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Spin } from 'antd'
import { format } from 'date-fns'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Grid, Card, Badge, Icon, Tabs } from 'Modules/Core'

import * as styles from './styles'
import { usePhone } from './Hooks/usePhone'
import { Calls } from './Components/Calls'
import { Texts } from './Components/Texts'
import { Contacts } from './Components/Contacts'
import { Locations } from './Components/Locations'
import { useAccount } from '../Jackal/Hooks/useAccount'

const breadcrumbs = deviceId => [
  { icon: 'home', to: '/' },
  { text: 'Sources', to: '/inputs' },
  { text: 'Jackal', to: '/inputs/jackal' },
  { text: `Phone ${deviceId || ''}` }
]

export const Phone = ({ uid }) => {
  const { metadata } = usePhone({ uid })
  const account = useAccount({ uid })
  const { phone } = metadata
  const deviceId = phone ? phone.deviceId : null

  return (
    <PrivateLayout
      title={`Phone ${deviceId || ''}`}
      breadcrumbs={breadcrumbs(deviceId)}
    >
      {metadata.isLoading || !phone ? (
        <Spin />
      ) : (
        <Fragment>
          <Grid gap={2} gridTemplateColumns="repeat(2, 400px)">
            <Card>
              <div sx={{ display: 'flex' }}>
                <div sx={{ flex: 1 }}>
                  <h2 sx={styles.cardTitle}>
                    <Icon type="usb" size={20} sx={{ mr: 2, color: 'gray' }} />
                    {phone.deviceId}
                    {phone.name && `- ${phone.name}`}
                  </h2>
                  <h3 sx={styles.cardDescription}>{phone.description}</h3>
                </div>
                <div sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                  <Badge
                    type={phone.status === 'deployed' ? 'success' : 'warning'}
                  >
                    {phone.status}
                  </Badge>
                </div>
              </div>
            </Card>
            <Card sx={{ ml: 4 }}>
              <div>
                <h2 sx={styles.cardTitle}>
                  <Icon
                    type="calendar"
                    size={20}
                    sx={{ mr: 2, color: 'gray' }}
                  />{' '}
                  Last update
                </h2>
                <h3 sx={styles.cardDescription}>
                  {format(
                    new Date(phone.datetimeLastUpdate),
                    'yyyy/MM/dd HH:mm'
                  )}
                </h3>
              </div>
            </Card>
          </Grid>
          <Grid gridTemplateColumns="810px">
            <Card sx={{ mt: 4, '.ant-card-body': { p: 0 } }}>
              <Tabs
                tabBarStyle={{ margin: 0 }}
                size="large"
                defaultActiveKey="1"
              >
                <Tabs.TabPane tab="Calls" key="1">
                  <Calls uid={uid} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Texts" key="2">
                  <Texts uid={uid} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Contacts" key="4">
                  <Contacts uid={uid} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Locations" key="3">
                  <Locations uid={uid} />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Grid>
        </Fragment>
      )}
    </PrivateLayout>
  )
}
