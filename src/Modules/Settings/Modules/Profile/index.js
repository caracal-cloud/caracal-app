/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Formik } from 'formik'

import { Card } from 'Modules/Core'
import { useProfile } from './Hooks/useProfile'
import { ProfileForm } from './Components/ProfileForm'

export const Profile = () => {
  const profile = useProfile()

  return (
    <Card title="Profile" icon="profile" loading={profile.metadata.isFetching}>
      <Formik {...profile.formOpts} onSubmit={profile.handleSubmit}>
        {form => <ProfileForm profile={profile} form={form} />}
      </Formik>
    </Card>
  )
}
