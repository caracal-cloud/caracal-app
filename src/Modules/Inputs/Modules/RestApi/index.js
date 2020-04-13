/** @jsx jsx */
import * as React from 'react'
import { jsx } from 'theme-ui'

import { PrivateLayout } from 'Layouts/PrivateLayout'

import {
  Card,
  Grid,
  Divider,
} from 'Modules/Core'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Sources'},
  { text: 'REST API' }
]

export function RestApi() {

  return (
    <PrivateLayout title="REST API" breadcrumbs={breadcrumbs}>

      <Grid
        gridGap={4}
        gridTemplateColumns={['1fr', '1fr', '1.5fr 1fr', '600px 400px']}
      >
        <Card title="Add New Account" icon="plus-square">
            The REST API doesn't yet have a frontend, but you can still connect your IoT devices or mobile applications! Just email contact@caracal.cloud and we'll give you a write key and instructions.
          <Divider gap={3} />
        </Card>

      </Grid>
    </PrivateLayout>
  )
}
