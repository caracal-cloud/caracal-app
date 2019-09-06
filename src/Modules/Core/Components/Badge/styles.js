const types = {
  info: {
    bg: 'blue.4',
    color: 'blue.1'
  },
  success: {
    bg: 'forest.4',
    color: 'forest.1'
  },
  danger: {
    bg: 'red.4',
    color: 'red.1'
  },
  warning: {
    bg: 'gold.4',
    color: 'gold.1'
  }
}

export const wrapper = type => ({
  ...types[type],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '12px',
  height: 20,
  borderRadius: 'circle',
  fontSize: 10,
  fontWeight: 600,
  textTransform: 'uppercase'
})
