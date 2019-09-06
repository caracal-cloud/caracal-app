/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Result } from 'antd'
import { Link, navigate } from '@reach/router'

import { PublicLayout } from 'Layouts/PublicLayout'
import { AuthCard } from 'Modules/Auth'
import { Input, Button, formUtils } from 'Modules/Core'
import { useRegister } from './Hooks/useRegister'
import { Formik } from 'formik'

export function Register() {
  const { formOpts, handleSubmit, isRegistering, isRegistered } = useRegister()

  return (
    <PublicLayout>
      {!isRegistered ? (
        <AuthCard>
          <AuthCard.Header icon="user-add" title="Register" />
          <AuthCard.Body>
            <Formik {...formOpts} onSubmit={handleSubmit}>
              {form => (
                <form onSubmit={form.handleSubmit}>
                  <Input
                    {...formUtils.getInputProps('organizationName', form)}
                    large
                    type="text"
                    leftIcon="shop"
                    placeholder="Organization"
                  />
                  <Input
                    {...formUtils.getInputProps('organizationShortName', form)}
                    large
                    type="text"
                    leftIcon="shop"
                    placeholder="Organization Short Name"
                  />
                  <Input
                    {...formUtils.getInputProps('accountName', form)}
                    large
                    type="text"
                    leftIcon="profile"
                    placeholder="Full name"
                  />
                  <Input
                    {...formUtils.getInputProps('accountPhoneNumber', form)}
                    large
                    type="tel"
                    leftIcon="phone"
                    placeholder="Phone Number"
                  />
                  <Input
                    {...formUtils.getInputProps('accountEmail', form)}
                    large
                    type="email"
                    leftIcon="mail"
                    placeholder="Email"
                  />
                  <Input
                    {...formUtils.getInputProps('accountPassword', form)}
                    large
                    type="password"
                    leftIcon="lock"
                    placeholder="Password"
                  />
                  <Input
                    {...formUtils.getInputProps('accountPasswordConfirm', form)}
                    large
                    type="password"
                    leftIcon="lock"
                    placeholder="Confirm Password"
                  />
                  <Button
                    block
                    type="submit"
                    intent="primary"
                    disabled={!form.dirty}
                    loading={isRegistering}
                  >
                    Create Your Account
                  </Button>
                </form>
              )}
            </Formik>
          </AuthCard.Body>
          <AuthCard.Footer>
            Already have an account? <Link to="/login">Login</Link>
          </AuthCard.Footer>
        </AuthCard>
      ) : (
        <AuthCard>
          <Result
            sx={{ py: 2, px: 2 }}
            status="success"
            title="Successfully registered!"
            subTitle="We sent an email from confirmation to you. Check your email then login."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            ]}
          />
        </AuthCard>
      )}
    </PublicLayout>
  )
}
