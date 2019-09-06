import colors from './colors'

export default {
  breakpoints: ['600px', '1024px', '1330px'],
  colors: {
    ...colors,
    primary: colors.blue[2],
    secondary: colors.indigo[2],
    text: colors.dark[0],
    bodyBg: colors.lightGray[3],
    border: colors.lightGray[3],
    sidebar: {
      bg: colors.dark[0],
      highlight: colors.forest[3]
    }
  },
  fonts: {
    body: '"Source Sans Pro", system-ui, sans-serif',
    heading: '"Red Hat Display", system-ui, sans-serif'
  },
  radii: {
    square: 0,
    radius: 6,
    rounded: 10,
    circle: 9999
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25);'
  ],
  styles: {
    root: {
      fontFamily: 'body',
      fontSize: 3,
      color: 'text',
      bg: 'bodyBg'
    },
    h1: {
      mt: 2,
      fontSize: 6,
      fontWeight: 600,
      fontFamily: 'heading',
      color: 'dark.3'
    },
    h2: {
      fontWeight: 600,
      fontSize: 5
    },
    h4: {
      fontSize: 0,
      fontWeight: 600,
      color: 'gray.2',
      textTransform: 'uppercase'
    }
  }
}
