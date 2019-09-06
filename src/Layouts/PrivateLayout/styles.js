export const wrapper = {
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: '200px 1fr',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: `
    "Sidebar Header"
    "Sidebar Main"
    "Sidebar Main"
  `
}

export const sidebar = {
  gridArea: 'Sidebar'
}

export const header = {
  py: 4,
  px: 5,
  pb: 0,
  gridArea: 'Header',
  h1: {
    m: 0
  }
}

export const main = {
  p: 5,
  py: 4,
  gridArea: 'Main'
}

export const breadcrumbItem = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '.bp3-icon': {
    color: 'forest.2'
  }
}
