export const formGroup = noMargin => ({
  mb: noMargin ? 0 : '12px'
})

export const label = error => ({
  mb: 1,
  fontSize: 0,
  fontWeight: 600,
  color: error ? 'red.2' : 'gray.2',
  textTransform: 'uppercase'
})

export const error = {
  mt: 1,
  fontSize: 0,
  color: 'red.2'
}
