/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid, CheckboxGroup, Checkbox, formUtils } from 'Modules/Core'

export function StorageCheckbox({ className, ...form }) {
  return (
    <Grid
      sx={{ mt: 3 }}
      className={className}
      gap={3}
      gridTemplateColumns="repeat(2, 1fr)"
    >
      <CheckboxGroup vertical label="Storage">
        <Checkbox {...formUtils.getCheckboxProps('outputDatabase', form)}>
          Store data on Caracal
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup vertical label="Outputs">
        <Checkbox {...formUtils.getCheckboxProps('outputKml', form)}>
          KML (Google Earth)
        </Checkbox>
        <Checkbox {...formUtils.getCheckboxProps('outputAgol', form)}>
          ArcGIS Online
        </Checkbox>
      </CheckboxGroup>
    </Grid>
  )
}
