/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { List, Icon, Button } from 'Modules/Core'

export function FilesList({ metadata, ...addDrive }) {
  return (
    <div>
      <Styled.h4>Select the Google Sheets document to use</Styled.h4>
      <List bordered>
        {metadata.files &&
          metadata.files.map(file => (
            <List.Item
              key={file.id}
              leftItem={
                <Icon type="file-excel" size={18} sx={{ color: 'forest.2' }} />
              }
              rightItem={
                <Button
                  size="small"
                  intent="default"
                  onClick={addDrive.handleSelectFile(file)}
                  loading={
                    metadata.isLoadingSheets &&
                    metadata.selectedFile.id === file.id
                  }
                >
                  Select
                </Button>
              }
            >
              {file.name}
            </List.Item>
          ))}
      </List>
    </div>
  )
}
