/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Router, Redirect } from '@reach/router'

import { Collars } from 'Modules/Inputs/Modules/Collars'
import { CloudDrive } from 'Modules/Inputs/Modules/CloudDrive'
import { Radios } from 'Modules/Inputs/Modules/Radios'

import { AccountList } from './Modules/AccountList'
import { SystemList } from './Modules/SystemList'
import { CloudDriveCallback } from './Modules/CloudDriveCallback'
import { Jackal } from './Modules/Jackal'
import { Phone } from './Modules/Phone'
import { RestApi } from './Modules/RestApi'

export { AddButton } from './Components/AddButton'
export { ItemCard } from './Components/ItemCard'

export function Inputs() {
  return (
    <Router>
      <Collars path="/collars" />
      <AccountList path="/collars/accounts/:id" />
      <CloudDrive path="/cloud-drive" />
      <CloudDriveCallback path="/cloud-drive-callback" />
      <Radios path="/radios" />
      <RestApi path="/rest-api" />
      <SystemList path="/radios/systems/:id" />
      <Jackal path="/jackal" />
      <Phone path="/jackal/:uid" />
      <Redirect from="/" to="/inputs/collars" noThrow />
    </Router>
  )
}
