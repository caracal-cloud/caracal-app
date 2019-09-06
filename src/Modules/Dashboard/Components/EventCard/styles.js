const types = {
  high: 'red.3',
  medium: 'gold.3',
  low: 'gray.3'
}

export const iconWrapper = {
  borderRadius: 'rounded'
}

export const icon = type => ({
  color: types[type]
})
