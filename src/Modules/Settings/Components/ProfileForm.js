/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'
import { Input, Button, formUtils } from 'Modules/Core'

export function ProfileForm({ profile, form }) {
  const { metadata } = profile
  const { item } = profile.metadata

  useEffect(() => {
    if (item && !form.dirty) {
      form.setValues({
        email: item.email,
        name: item.name,
        phoneNumber: item.phoneNumber
      })
    }
  }, [form, item])

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        {...formUtils.getInputProps('email', form)}
        large
        disabled
        type="email"
        leftIcon="mail"
        placeholder="Type your email..."
        label="Email"
      />
      <Input
        {...formUtils.getInputProps('name', form)}
        large
        type="text"
        leftIcon="shop"
        placeholder="Type your name..."
        label="Name"
      />
      <Input
        {...formUtils.getInputProps('phoneNumber', form)}
        large
        type="tel"
        leftIcon="phone"
        placeholder="Type your phone..."
        label="Phone"
      />
      <div sx={{ mt: 1 }}>
        <Button type="submit" intent="primary" loading={metadata.isSubmitting}>
          Update Profile
        </Button>
      </div>
    </form>
  )
}
