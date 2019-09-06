export const wrapper = maxHeight => ({
  position: 'relative',
  boxShadow: 1,
  borderRadius: 'radius',
  '.ant-list-item:first-of-type': {
    pt: 0
  },
  '.ant-card-head': {
    bg: 'lightGray.4'
  },
  ...(maxHeight && {
    '.ant-card-body': {
      maxHeight,
      overflowY: 'scroll'
    }
  })
})

export const overlay = {
  bg: 'rgba(255,255,255,0.8)',
  zIndex: 99,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
