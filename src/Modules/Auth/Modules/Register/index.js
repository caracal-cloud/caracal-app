/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Result } from 'antd'
import { navigate } from '@reach/router'

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
          <AuthCard.Header icon="user-add" title="Sign Up" />
          <AuthCard.Body>
            <Formik {...formOpts} onSubmit={handleSubmit}>
              {form => (
                <form onSubmit={form.handleSubmit}>
                  <Input
                    {...formUtils.getInputProps('accountName', form)}
                    large
                    type="text"
                    leftIcon="profile"
                    placeholder="Name"
                  />
                  <Input
                    {...formUtils.getInputProps('accountEmail', form)}
                    large
                    type="email"
                    leftIcon="mail"
                    placeholder="Email"
                  />
                  <Input
                    {...formUtils.getInputProps('organizationName', form)}
                    large
                    type="text"
                    leftIcon="shop"
                    placeholder="Organization"
                  />
                  <Input
                    {...formUtils.getInputProps('accountPassword', form)}
                    large
                    visibilityToggle
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
                    Get started
                  </Button>
                </form>
              )}
            </Formik>
          </AuthCard.Body>
          <AuthCard.Footer>
            By continuing you agree to
            <br /> the Caracal's{' '}
            <a
              href="https://caracal.cloud/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
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
