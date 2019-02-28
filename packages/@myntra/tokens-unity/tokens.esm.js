const color = {
  primary: 'rgb(41, 198, 212)',
  secondary: 'rgb(41, 198, 212)',
  accent: 'rgb(41, 198, 212)',
  success: 'rgb(96, 184, 122)',
  error: 'rgb(212, 106, 104)',
  warning: 'rgb(240, 186, 84)',
  info: 'rgb(82, 142, 230)',
  black: {
    dark: 'rgb(0, 0, 0)',
    base: 'rgba(0, 0, 0, .87)',
    light: 'rgba(0, 0, 0, .54)',
    xLight: 'rgba(0, 0, 0, .27)'
  },
  white: {
    base: 'rgba(255, 255, 255, 1)',
    light: 'rgba(255, 255, 255, .7)',
    xLight: 'rgba(255, 255, 255, .5)'
  },
  unityBlue: { base: 'rgb(41, 198, 212)', light: 'rgb(41, 198, 212)' },
  blue: { base: 'rgb(82, 142, 230)' },
  gray: {
    xxLight: 'rgb(249, 249, 249)',
    xLight: 'rgb(244, 246, 248)',
    light: 'rgb(238, 238, 238)',
    base: 'rgb(230, 230, 230)',
    dark: 'rgb(212, 212, 212)'
  },
  green: { base: 'rgb(96, 184, 122)' },
  yellow: { base: 'rgb(240, 186, 84)' },
  red: { base: 'rgb(212, 106, 104)' },
  transparent: { base: 'rgba(0, 0, 0, 0)' }
}
const font = {
  size: {
    xSmall: '10px',
    small: '11px',
    base: '12px',
    large: '14px',
    xLarge: '16px',
    xxLarge: '20px',
    xxxLarge: '24px',
    xxxxLarge: '28px'
  },
  height: {
    xSmall: '11px',
    small: '13px',
    base: '14px',
    large: '16px',
    xLarge: '21px',
    xxLarge: '24px',
    xxxLarge: '28px',
    xxxxLarge: '33px'
  },
  face: {
    default: ['Roboto', 'Helvetica', 'sans-serif'],
    accent: ['Roboto Condensed', 'sans-serif']
  },
  weight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900
  }
}
const opacity = { xLight: 0.1, light: 0.2, base: 0.5, dark: 0.75 }
const shadow = {
  lightSmall: '0px 2px 8px 0px rgba(0, 0, 0, .27)',
  darkSmall: '0px 2px 4px 0px rgba(0, 0, 0, .87)',
  darkLarge: '0px 2px 8px 0px rgba(0, 0, 0, .87)'
}
const shape = {
  error: {
    backgroundColor: 'rgb(212, 106, 104)',
    borderColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(255, 255, 255, 1)'
  },
  info: {
    backgroundColor: 'rgb(82, 142, 230)',
    borderColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(255, 255, 255, 1)'
  },
  success: {
    backgroundColor: 'rgb(96, 184, 122)',
    borderColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(255, 255, 255, 1)'
  },
  warning: {
    backgroundColor: 'rgb(240, 186, 84)',
    borderColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(255, 255, 255, 1)'
  },
  outline: {
    error: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(212, 106, 104)',
      color: 'rgb(212, 106, 104)'
    },
    info: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(82, 142, 230)',
      color: 'rgb(82, 142, 230)'
    },
    success: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(96, 184, 122)',
      color: 'rgb(96, 184, 122)'
    },
    warning: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(240, 186, 84)',
      color: 'rgb(240, 186, 84)'
    }
  }
}
const borderRadius = { button: 0 }
const size = {
  none: 0,
  xxSmall: '4px',
  xSmall: '8px',
  small: '12px',
  base: '16px',
  large: '24px'
}
const relativeSize = {
  none: 0,
  xxSmall: '0.33333em',
  xSmall: '0.66667em',
  small: '1em',
  base: '1.33333em',
  large: '2em'
}
const typography = {
  heading: {
    h1: { fontSize: '28px', fontWeight: 500, lineHeight: '33px' },
    h2: { fontSize: '24px', fontWeight: 500, lineHeight: '28px' },
    h3: { fontSize: '20px', fontWeight: 500, lineHeight: '24px' },
    h4: { fontSize: '16px', fontWeight: 500, lineHeight: '21px' }
  },
  text: {
    table: { fontSize: '12px', fontWeight: 400, lineHeight: '14px' },
    paragraph: { fontSize: '14px', fontWeight: 400, lineHeight: '16px' },
    smallText: { fontSize: '11px', fontWeight: 400, lineHeight: '13px' },
    title: { fontSize: '14px', fontWeight: 500, lineHeight: '16px' },
    caption: { fontSize: '10px', fontWeight: 400, lineHeight: '11px' }
  },
  color: {
    dark: {
      primary: 'rgba(0, 0, 0, .87)',
      secondary: 'rgba(0, 0, 0, .54)',
      disabled: 'rgba(0, 0, 0, .27)'
    },
    light: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, .7)',
      disabled: 'rgba(255, 255, 255, .5)'
    },
    error: { primary: 'rgb(212, 106, 104)' },
    warning: { primary: 'rgb(240, 186, 84)' },
    success: { primary: 'rgb(96, 184, 122)' },
    info: { primary: 'rgb(82, 142, 230)' },
    link: { primary: 'rgb(82, 142, 230)' }
  }
}
const zIndex = { nav: 14, modal: 15, dropdown: 16 }
export {
  color,
  font,
  opacity,
  shadow,
  shape,
  borderRadius,
  size,
  relativeSize,
  typography,
  zIndex
}
export default {
  color,
  font,
  opacity,
  shadow,
  shape,
  borderRadius,
  size,
  relativeSize,
  typography,
  zIndex
}
import ThemeProvider from './tokens.jsx'
export { ThemeProvider }
