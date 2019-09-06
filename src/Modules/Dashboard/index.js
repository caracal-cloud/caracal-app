/** @jsx jsx */
import { jsx } from 'theme-ui'
import dayjs from 'dayjs'

import { Grid, Card, List, Metadata } from 'Modules/Core'
import { PrivateLayout } from 'Layouts/PrivateLayout'

import { EventCard } from './Components/EventCard'
import { useEvents } from './Hooks/useEvents'
import { useChanges } from './Hooks/useChanges'
import { Empty } from 'antd'

const breadcrumbs = [{ icon: 'home', to: '/' }, { text: 'Dashboard' }]

export function Dashboard() {
  const events = useEvents()
  const changes = useChanges()

  return (
    <PrivateLayout title="Dashboard" breadcrumbs={breadcrumbs}>
      <Grid
        gridGap={4}
        gridTemplateColumns={['1fr', '1fr', '1.5fr 1fr', '600px 400px']}
      >
        <Card title="Events" icon="alert" maxHeight={250}>
          <List loading={events.metadata.isLoading}>
            {events.metadata.isEmpty ? (
              <Empty />
            ) : (
              events.metadata.data.map(event => {
                const date = dayjs(event.datetimeCreated)
                return (
                  <EventCard
                    key={event.uid}
                    date={date.format('YYYY-MM-DD')}
                    hour={date.format('HH:mm')}
                    type={event.level}
                    message={event.message}
                  />
                )
              })
            )}
          </List>
        </Card>
        <Card title="Recent Changes" icon="container" maxHeight={250}>
          <List loading={changes.metadata.isLoading}>
            {changes.metadata.isEmpty ? (
              <Empty />
            ) : (
              changes.metadata.data.map(change => {
                const date = dayjs(change.datetimeCreated)
                return (
                  <List.Item key={change.uid}>
                    <Metadata
                      date={date.format('YYYY-MM-DD')}
                      hour={date.format('HH:mm')}
                    />
                    <List.ItemText>{change.message}</List.ItemText>
                  </List.Item>
                )
              })
            )}
          </List>
        </Card>
      </Grid>
    </PrivateLayout>
  )
}
