/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Spin, message } from 'antd'
import humanize from 'humanize-string'
import copy from 'copy-text-to-clipboard'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Grid, List, BoxTitle, Button } from 'Modules/Core'
import { useGoogleEarth } from './Hooks/useGoogleEarth'

const breadcrumbs = [
  { icon: 'home', to: '/' },
  { text: 'Destinations', to: '/outputs' },
  { text: 'Google Earth' }
]

function renderListItem(props) {
  function handleCopy() {
    copy(props.link)
    message.info('URL copied to clipboard')
  }
  return (
    <List.Item
      rightItem={<Button icon="copy" intent="default" onClick={handleCopy} />}
    >
      <List.ItemText>
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          {props.link.slice(0, 65)}...
        </a>
      </List.ItemText>
    </List.Item>
  )
}

export function GoogleEarth() {
  const googleEarth = useGoogleEarth()
  const { metadata } = googleEarth
  const keys = Object.keys(metadata.links)

  return (
    <PrivateLayout title="Google Earth" breadcrumbs={breadcrumbs}>
      <Grid
        gridGap={2}
        gridTemplateColumns={['minmax(450px, 1fr)', '1fr', '600px']}
      >
        {metadata.isLoading && <Spin />}
        {keys &&
          keys.length > 0 &&
          keys.map(type => (
            <List
              bordered
              size="large"
              dataSource={metadata.links[type].map(link => ({ link }))}
              header={<BoxTitle>{humanize(type)}</BoxTitle>}
              renderItem={renderListItem}
            />
          ))}
      </Grid>
    </PrivateLayout>
  )
}
