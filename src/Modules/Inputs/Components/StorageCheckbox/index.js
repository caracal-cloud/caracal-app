/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useMachine } from '@xstate/react'
import { CheckboxGroup, Checkbox, formUtils } from 'Modules/Core'
import { storageCheckboxMachine } from './machines/storeCheckbox'

export function StorageCheckbox({ className, ...form }) {
  const [state] = useMachine(storageCheckboxMachine)
  const isLoading = state.matches('loading')
  const isConnected = state.context.connected

  return (
    <div sx={{ mt: 3 }} className={className}>
      <CheckboxGroup vertical label="Outputs">
        <Checkbox
          {...formUtils.getCheckboxProps('outputKml', form)}
          disabled={isLoading}
        >
          KML (Google Earth)
        </Checkbox>
        <Checkbox
          {...formUtils.getCheckboxProps('outputAgol', form)}
          disabled={isLoading || !isConnected}
        >
          ArcGIS Online
        </Checkbox>
      </CheckboxGroup>
    </div>
  )
}
