module.exports = {
  color: {
    primary: 'rgba(79, 71, 200, 1)',
    secondary: 'rgba(79, 71, 200, 1)',
    accent: 'rgba(79, 71, 200, 1)',
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
    nucleiBlue: {
      base: 'rgba(79, 71, 200, 1)',
      light: 'rgba(170, 166, 228, 1)'
    },
    blue: {
      base: 'rgb(82, 142, 230)'
    },
    gray: {
      xxLight: 'rgb(249, 249, 249)',
      xLight: 'rgb(244, 246, 248)',
      light: 'rgb(238, 238, 238)',
      base: 'rgb(230, 230, 230)',
      dark: 'rgb(212, 212, 212)'
    },
    green: {
      base: 'rgb(96, 184, 122)'
    },
    yellow: {
      base: 'rgb(240, 186, 84)'
    },
    red: {
      base: 'rgb(212, 106, 104)'
    },
    transparent: {
      base: 'rgba(0, 0, 0, 0)'
    }
  },
  font: {
    size: {
      xSmall: '0.83333rem',
      small: '0.91667rem',
      base: '1rem',
      large: '1.16667rem',
      xLarge: '1.33333rem',
      xxLarge: '1.66667rem',
      xxxLarge: '2rem',
      xxxxLarge: '2.33333rem'
    },
    height: {
      xSmall: '0.91667rem',
      small: '1.08333rem',
      base: '1.16667rem',
      large: '1.33333rem',
      xLarge: '1.75rem',
      xxLarge: '2rem',
      xxxLarge: '2.33333rem',
      xxxxLarge: '2.75rem'
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
  },
  opacity: {
    xLight: 0.1,
    light: 0.2,
    base: 0.5,
    dark: 0.75
  },
  shadow: {
    lightSmall: '0px 2px 8px 0px rgba(0, 0, 0, .27)',
    darkSmall: '0px 2px 4px 0px rgba(0, 0, 0, .87)',
    darkLarge: '0px 2px 8px 0px rgba(0, 0, 0, .87)'
  },
  shape: {
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
  },
  borderRadius: {
    button: '2em'
  },
  size: {
    none: 0,
    xxSmall: '4px',
    xSmall: '8px',
    small: '12px',
    base: '16px',
    large: '24px'
  },
  relativeSize: {
    none: 0,
    xxSmall: '0.33333em',
    xSmall: '0.66667em',
    small: '1em',
    base: '1.33333em',
    large: '2em'
  },
  typography: {
    heading: {
      h1: {
        fontSize: '2.33333rem',
        fontWeight: 500,
        lineHeight: '2.75rem'
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: '2.33333rem'
      },
      h3: {
        fontSize: '1.66667rem',
        fontWeight: 500,
        lineHeight: '2rem'
      },
      h4: {
        fontSize: '1.33333rem',
        fontWeight: 500,
        lineHeight: '1.75rem'
      }
    },
    text: {
      table: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.16667rem'
      },
      paragraph: {
        fontSize: '1.16667rem',
        fontWeight: 400,
        lineHeight: '1.33333rem'
      },
      smallText: {
        fontSize: '0.91667rem',
        fontWeight: 400,
        lineHeight: '1.08333rem'
      },
      title: {
        fontSize: '1.16667rem',
        fontWeight: 500,
        lineHeight: '1.33333rem'
      },
      caption: {
        fontSize: '0.83333rem',
        fontWeight: 400,
        lineHeight: '0.91667rem'
      }
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
      error: {
        primary: 'rgb(212, 106, 104)'
      },
      warning: {
        primary: 'rgb(240, 186, 84)'
      },
      success: {
        primary: 'rgb(96, 184, 122)'
      },
      info: {
        primary: 'rgb(82, 142, 230)'
      },
      link: {
        primary: 'rgb(82, 142, 230)'
      }
    }
  },
  zIndex: {
    nav: 1000,
    modal: 1100,
    dropdown: 1200
  }
}
