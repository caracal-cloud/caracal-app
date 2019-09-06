/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from '@reach/router'
import { Formik } from 'formik'

import { PublicLayout } from 'Layouts/PublicLayout'
import { AuthCard } from 'Modules/Auth'
import { Button, Input, useQueryString, formUtils } from 'Modules/Core'

import { useLogin } from './Hooks/useLogin'

export function Login(props) {
  const { email } = useQueryString(props.location)
  const { formOpts, isLogging, handleSubmit } = useLogin()

  return (
    <PublicLayout>
      <AuthCard>
        <AuthCard.Header icon="login" title="Login" />
        <AuthCard.Body>
          <Formik
            {...formOpts}
            onSubmit={handleSubmit}
            initialValues={{
              email,
              password: ''
            }}
          >
            {form => (
              <form onSubmit={form.handleSubmit}>
                <Input
                  {...formUtils.getInputProps('email', form)}
                  type="email"
                  large
                  leftIcon="mail"
                  placeholder="Your email..."
                />
                <Input
                  {...formUtils.getInputProps('password', form)}
                  large
                  leftIcon="lock"
                  type="password"
                  placeholder="Your password..."
                />
                <Button
                  block
                  type="submit"
                  intent="primary"
                  disabled={!form.dirty}
                  loading={isLogging}
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </AuthCard.Body>
        <AuthCard.Footer>
          <Link to="/forgot-password">Forgot password?</Link>
          <div sx={{ mt: 1 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </AuthCard.Footer>
      </AuthCard>
    </PublicLayout>
  )
}
