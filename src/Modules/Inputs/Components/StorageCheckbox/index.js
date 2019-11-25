/** @jsx jsx */
import { jsx } from 'theme-ui'
import { CheckboxGroup, Checkbox, formUtils } from 'Modules/Core'

export function StorageCheckbox({ className, ...form }) {
  return (
    <div sx={{ mt: 3 }} className={className}>
      <CheckboxGroup vertical label="Outputs">
        <Checkbox {...formUtils.getCheckboxProps('outputKml', form)}>
          KML (Google Earth)
        </Checkbox>
        <Checkbox {...formUtils.getCheckboxProps('outputAgol', form)}>
          ArcGIS Online
        </Checkbox>
      </CheckboxGroup>
    </div>
  )
}
