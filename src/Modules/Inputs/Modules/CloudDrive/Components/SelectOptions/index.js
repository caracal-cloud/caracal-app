/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { InputNumber, Checkbox } from 'antd'
import { useEffect } from 'react'

import { StorageCheckbox } from 'Modules/Inputs/Components/StorageCheckbox'

import {
  Grid,
  Select,
  Divider,
  Button,
  formUtils,
  usePrevious
} from 'Modules/Core'

export function SelectOptions({ form, metadata, ...addDrive }) {
  const { selectedFile } = metadata
  const prevSelectedFile = usePrevious(selectedFile)

  useEffect(() => {
    if (!prevSelectedFile || selectedFile !== prevSelectedFile) {
      form.setValues({
        ...form.values,
        fileId: selectedFile.id,
        title: selectedFile.name
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, prevSelectedFile])

  return (
    <form onSubmit={form.handleSubmit}>
      <div sx={{ gridColumn: 'span 2' }}>
        <Styled.h4>Select the Google Sheet document to use</Styled.h4>
        <Checkbox.Group
          value={form.values.sheetIds}
          onChange={list => form.setFieldValue('sheetIds', list)}
          options={metadata.sheets.map(sheet => ({
            value: sheet.id,
            label: sheet.title
          }))}
        />
      </div>
      <Divider gap={3} />
      <Grid gridTemplateColumns="1fr 1fr" gridGap={3}>
        <div>
          <Styled.h4>Header row number</Styled.h4>
          <InputNumber
            sx={{ width: '50%' }}
            onChange={val => form.setFieldValue('headerRowIndex', val)}
            value={form.values.headerRowIndex}
          />
        </div>
        <Select
          {...formUtils.getSelectProps('coordinateSystem', form)}
          label="Select cordinate system"
          placeholder="Select one option..."
        >
          <Select.Option value="dd">Decimal degrees</Select.Option>
          <Select.Option value="dms">Decimal minutes seconds</Select.Option>
          <Select.Option value="utm">UTM</Select.Option>
        </Select>
      </Grid>
      <Divider gap={3} />
      <Grid gridGap={2} gridTemplateColumns="0.8fr 0.8fr 1fr">
        <Grid gridGap={3} gridTemplateRows="repeat(2, 1fr)">
          <div>
            <Styled.h4>X column index</Styled.h4>
            <InputNumber
              onChange={val => form.setFieldValue('xColumnIndex', val)}
              value={form.values.xColumnIndex}
            />
          </div>
          <div>
            <Styled.h4>Y column index</Styled.h4>
            <InputNumber
              onChange={val => form.setFieldValue('yColumnIndex', val)}
              value={form.values.yColumnIndex}
            />
          </div>
        </Grid>
        <Grid gridGap={3} gridTemplateRows="repeat(2, 1fr)">
          <div>
            <Styled.h4>Date column index</Styled.h4>
            <InputNumber
              onChange={val => form.setFieldValue('dateColumnIndex', val)}
              value={form.values.dateColumnIndex}
            />
          </div>
          <div>
            <Styled.h4>GZD column index</Styled.h4>
            <InputNumber
              onChange={val => form.setFieldValue('gridZoneColumnIndex', val)}
              value={form.values.gridZoneColumnIndex}
            />
          </div>
        </Grid>
        <StorageCheckbox sx={{ mt: 0 }} {...form} />
      </Grid>
      <Divider gap={3} />
      <Grid gridGap={2} gridTemplateColumns="1fr auto auto">
        <div>
          <Button intent="default" onClick={addDrive.handleBack}>
            Back
          </Button>
        </div>
        <Button intent="default" onClick={addDrive.handleCloseModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          loading={metadata.isSubmitting}
          disabled={!form.dirty || !form.isValid}
        >
          Add
        </Button>
      </Grid>
    </form>
  )
}
