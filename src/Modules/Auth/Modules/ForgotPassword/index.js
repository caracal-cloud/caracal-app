/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, Redirect } from '@reach/router'
import { Formik } from 'formik'

import { PublicLayout } from 'Layouts/PublicLayout'
import { Input, Button, formUtils } from 'Modules/Core'
import { AuthCard } from 'Modules/Auth'

import { useForgotPassword } from './Hooks/useForgotPassword'

export function ForgotPassword() {
  const { formOpts, handleSubmit, isSending, isSended } = useForgotPassword()

  return (
    <PublicLayout>
      <AuthCard>
        <AuthCard.Header icon="lock" title="Forgot Password" />
        <AuthCard.Body>
          <Formik {...formOpts} onSubmit={handleSubmit}>
            {form => {
              if (isSended) {
                const url = `/reset-confirm?email=${form.values.email}`
                return <Redirect to={url} noThrow />
              }
              return (
                <form onSubmit={form.handleSubmit}>
                  <Input
                    {...formUtils.getInputProps('email', form)}
                    type="email"
                    large
                    leftIcon="mail"
                    placeholder="Your email..."
                  />
                  <Button
                    block
                    type="submit"
                    intent="primary"
                    disabled={!form.dirty}
                    loading={isSending}
                  >
                    Reset password
                  </Button>
                </form>
              )
            }}
          </Formik>
        </AuthCard.Body>
        <AuthCard.Footer>
          Remember now? <Link to="/login">Login</Link>
        </AuthCard.Footer>
      </AuthCard>
    </PublicLayout>
  )
}
