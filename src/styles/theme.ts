export default {
  grid: {
    container: '65rem',
    gutter: '1.6rem'
  },
  border: {
    radius: '0.4rem'
  },
  font: {
    family: "'Oswald', 'Helvetica', 'Arial', 'sans-serif'",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xsmall: '0.8rem',
      small: '0.9rem',
      medium: '1rem',
      large: '1.2rem',
      xlarge: '1.4rem',
      xxlarge: '1.8rem',
      huge: '2.8rem'
    }
  },
  colors: {
    primary: '#1e293b',
    secondary: '#233d5a',
    mainBg: '#00032c',
    lightBg: '#F2F2F2',
    white: '#FAFAFA',
    black: '#00021f',
    lightGray: '#e5e7eb',
    gray: '#8F8F8F',
    darkGray: '#1f2937',
    red: '#ff2a2a',
    light: '#BDC4DE',
    mck_aqua: '#00ffff'
  },
  spacings: {
    xxsmall: '0.2rem',
    xsmall: '0.4rem',
    small: '0.6rem',
    medium: '0.8rem',
    large: '1.0rem',
    xlarge: '1.2rem',
    xxlarge: '1.4rem'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  },
  transition: {
    default: '0.3s ease-in-out',
    fast: '0.1s ease-in-out'
  }
} as const
