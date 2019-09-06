/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Redirect } from '@reach/router'
import { Formik } from 'formik'

import { PublicLayout } from 'Layouts/PublicLayout'
import { AuthCard } from 'Modules/Auth'
import { Input, Button, useQueryString, formUtils } from 'Modules/Core'

import { useResetConfirm } from './Hooks/useResetConfirm'

export function ResetConfirm(props) {
  const { email } = useQueryString(props.location)
  const { formOpts, handleSubmit, isResetting, isResetted } = useResetConfirm()

  return (
    <PublicLayout>
      <AuthCard>
        <AuthCard.Header icon="lock" title="Reset Confirm" />
        <AuthCard.Body>
          <Formik
            {...formOpts}
            onSubmit={handleSubmit}
            initialValues={{
              email,
              verificationCode: '',
              newPassword: ''
            }}
          >
            {form => {
              if (isResetted) {
                const url = `/login?email=${form.values.email}`
                return <Redirect to={url} noThrow />
              }
              return (
                <form onSubmit={form.handleSubmit}>
                  <Input
                    {...formUtils.getInputProps('email', form)}
                    large
                    type="email"
                    leftIcon="mail"
                    placeholder="Your email..."
                  />
                  <Input
                    {...formUtils.getInputProps('verificationCode', form)}
                    large
                    type="text"
                    leftIcon="code"
                    placeholder="Your code..."
                  />
                  <Input
                    {...formUtils.getInputProps('newPassword', form)}
                    large
                    type="password"
                    leftIcon="lock"
                    placeholder="Your new password..."
                  />
                  <Input
                    {...formUtils.getInputProps('newPasswordConfirm', form)}
                    large
                    type="password"
                    leftIcon="lock"
                    placeholder="Confirm your password..."
                  />
                  <Button
                    block
                    type="submit"
                    intent="primary"
                    disabled={!form.dirty}
                    loading={isResetting}
                  >
                    Confirm Reset
                  </Button>
                </form>
              )
            }}
          </Formik>
        </AuthCard.Body>
      </AuthCard>
    </PublicLayout>
  )
}
