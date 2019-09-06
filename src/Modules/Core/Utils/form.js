const getInputProps = (field, form) => {
  const { touched, errors } = form
  const value = form.values[field]
  const hasError = touched[field] && errors[field]

  return {
    value,
    name: field,
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    ...(hasError && {
      error: errors[field]
    })
  }
}

const getSelectProps = (name, { touched, errors, ...form }) => ({
  value: form.values[name],
  onChange: val => form.setFieldValue(name, val),
  ...(touched[name] && errors[name] && { error: errors[name] })
})

const getCheckboxProps = (field, form) => ({
  field,
  type: 'checkbox',
  checked: Boolean(form.values[field]),
  onChange: e => form.setFieldValue(field, e.target.checked)
})

const getRadioProps = (field, form) => ({
  value: form.values[field],
  onChange: e => form.setFieldValue(field, e.target.value)
})

const validations = {
  oneWordRegExp: /^[a-z0-9]+$/i,
  phoneNumberRegExp: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
}

export const formUtils = {
  getInputProps,
  getSelectProps,
  getCheckboxProps,
  getRadioProps,
  validations
}
