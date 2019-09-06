/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Router, Redirect } from '@reach/router'

import { ArcgisOnline } from './Modules/ArcgisOnline'
import { ArcgisCallback } from './Modules/ArcgisCallback'
import { GoogleEarth } from './Modules/GoogleEarth'

export function Outputs() {
  return (
    <Router>
      <ArcgisOnline path="/arcgis-online" />
      <ArcgisCallback path="/arcgis-callback" />
      <GoogleEarth path="/google-earth" />
      <Redirect from="/" to="/outputs/arcgis-online" />
    </Router>
  )
}
