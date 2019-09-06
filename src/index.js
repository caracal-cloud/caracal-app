/** @jsx jsx */
import { jsx } from 'theme-ui'
import { render } from 'react-dom'

import * as Sentry from '@sentry/browser'

import { App } from 'App'

import 'normalize.css'
import 'antd/dist/antd.css'
import './index.css'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== 'development'
})

render(<App />, document.getElementById('root'))
