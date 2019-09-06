export const wrapper = {
  position: 'relative'
}

export const link = {
  display: 'flex',
  alignItems: 'center',
  px: 3,
  height: 36,
  fontSize: 2,
  color: 'gray.4',
  ':hover, &[data-active=true]': {
    textDecoration: 'none',
    color: 'white',
    bg: 'rgba(255,255,255,.05)'
  },
  '::before': {
    position: 'absolute',
    top: '50%',
    left: '-2px',
    display: 'block',
    content: '""',
    height: 'calc(100%)',
    bg: 'sidebar.highlight',
    borderRadius: 'rounded',
    transform: 'translateY(-50%)'
  },
  '&[data-active=true]::before': {
    width: 5
  },
  '.bp3-icon': {
    mr: '12px',
    color: 'sidebar.highlight'
  },
  '.bp3-icon-chevron-right': {
    mr: 0
  }
}

export const linkContent = {
  flex: 1
}

export const menuItems = {
  '.ant-menu-item': {
    height: '30px',
    lineHeight: '30px'
  }
}
