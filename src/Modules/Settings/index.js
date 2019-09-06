/** @jsx jsx */
import { jsx } from 'theme-ui'

import { PrivateLayout } from 'Layouts/PrivateLayout'
import { Card, Grid } from 'Modules/Core'

import { useProfile } from './Hooks/useProfile'
import { Formik } from 'formik'
import { ProfileForm } from './Components/ProfileForm'

const breadcrumbs = [
  {
    icon: 'home',
    to: '/'
  },
  {
    text: 'Settings'
  }
]

export function Settings() {
  const profile = useProfile()

  return (
    <PrivateLayout title="Settings" breadcrumbs={breadcrumbs}>
      <Grid gridTemplateColumns={['minmax(300px, 1fr)', '1fr', '450px']}>
        <Card
          title="Profile"
          icon="profile"
          loading={profile.metadata.isFetching}
        >
          <Formik {...profile.formOpts} onSubmit={profile.handleSubmit}>
            {form => <ProfileForm profile={profile} form={form} />}
          </Formik>
        </Card>
      </Grid>
    </PrivateLayout>
  )
}
