module.exports = {
  color: {
    primary: 'rgba(79, 71, 200, 1)',
    black: {
      regular: 'rgb(0, 0, 0)',
      primary: 'rgba(0, 0, 0, .87)',
      secondary: 'rgba(0, 0, 0, .54)',
      disabled: 'rgba(0, 0, 0, .27)'
    },
    white: {
      regular: 'rgb(255, 255, 255)',
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, .7)',
      disabled: 'rgba(255, 255, 255, .5)'
    },
    blue: {
      primary: 'rgba(79, 71, 200, 1)',
      regular: 'rgb(82, 142, 230)'
    },
    gray: {
      lightest: 'rgb(249, 249, 249)',
      lighter: 'rgb(244, 246, 248)',
      light: 'rgb(238, 238, 238)',
      regular: 'rgb(230, 230, 230)',
      dark: 'rgb(212, 212, 212)'
    },
    green: {
      regular: 'rgb(96, 184, 122)'
    },
    yellow: {
      regular: 'rgb(240, 186, 84)'
    },
    red: {
      regular: 'rgb(212, 106, 104)'
    },
    transparent: {
      regular: 'rgba(0, 0, 0, 0)'
    }
  },
  font: {
    size: {
      tiny: '0.83333rem',
      small: '0.91667rem',
      base: '1rem',
      regular: '1.16667rem',
      medium: '1.33333rem',
      large: '1.66667rem',
      xlarge: '2rem',
      huge: '2.33333rem'
    },
    height: {
      tiny: '0.91667rem',
      small: '1.08333rem',
      base: '1.16667rem',
      regular: '1.33333rem',
      medium: '1.75rem',
      large: '2rem',
      xlarge: '2.33333rem',
      huge: '2.75rem'
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
    lighter: 0.1,
    light: 0.2,
    regular: 0.5,
    dark: 0.75
  },
  shadow: {
    lightSmall: '0px 2px 8px 0px rgba(0, 0, 0, .27)',
    darkSmall: '0px 2px 4px 0px rgba(0, 0, 0, .54)',
    darkLarge: '0px 2px 8px 0px rgba(0, 0, 0, .54)'
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
  size: {
    none: 0,
    tiny: '4px',
    small: '8px',
    medium: '12px',
    default: '16px',
    large: '24px'
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
        lineHeight: '1.33333rem'
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
        fontSize: '1.33333rem',
        fontWeight: 500,
        lineHeight: '1.75rem'
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
  }
}
