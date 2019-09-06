/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { Link } from '@reach/router'

import { PublicLayout } from 'Layouts/PublicLayout'
import { Card, Icon } from 'Modules/Core'

export function NotFound() {
  return (
    <PublicLayout>
      <Card
        sx={{
          p: 4,
          fontSize: 2,
          textAlign: 'center'
        }}
      >
        <Icon type="question-circle" theme="filled" size={70} color="blue.1" />
        <Styled.h2 sx={{ mt: 3, mb: 1 }}>Page Not Found</Styled.h2>
        <Link to="/">Go to Dashboard</Link>
      </Card>
    </PublicLayout>
  )
}
