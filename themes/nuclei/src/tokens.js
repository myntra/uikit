module.exports = {
  colorsPrimary: 'hsl(244, 54, 53)',
  colorsSuccess: 'hsl(138, 38, 55)',
  colorsWarning: 'hsl(39, 84, 64)',
  colorsDanger: 'hsl(1, 56, 62)',
  colorsGray: 'hsl(0, 0, 90)',
  colors: {
    primaryDark: 'hsl(244, 47, 32)',
    primaryBase: 'hsl(244, 54, 53)',
    primaryText: 'hsla(244, 54, 53, 0.87)',
    primaryLight: 'hsl(244, 54, 72)',
    primaryLighter: 'hsl(244, 54, 93)',
    successDark: 'hsl(137, 31, 33)',
    successBase: 'hsl(138, 38, 55)',
    successText: 'hsla(138, 38, 55, 0.87)',
    successLight: 'hsl(137, 38, 73)',
    successLighter: 'hsl(139, 38, 89)',
    warningDark: 'hsl(40, 48, 38)',
    warningBase: 'hsl(39, 84, 64)',
    warningText: 'hsla(39, 84, 64, 0.87)',
    warningLight: 'hsl(40, 84, 78)',
    warningLighter: 'hsl(40, 83, 91)',
    dangerDark: 'hsl(2, 34, 37)',
    dangerBase: 'hsl(1, 56, 62)',
    dangerText: 'hsla(1, 56, 62, 0.87)',
    dangerLight: 'hsl(2, 56, 77)',
    dangerLighter: 'hsl(2, 55, 90)',
    grayDark: 'hsl(0, 0, 83)',
    grayBase: 'hsl(0, 0, 90)',
    grayText: 'hsla(0, 0, 90, 0.87)',
    grayLight: 'hsl(0, 0, 93)',
    grayLighter: 'hsl(220, 22, 96)',
    grayLightest: 'hsl(0, 0, 98)',
  },
  textColors: {
    dark: {
      default: 'rgba(0, 0, 0, 0.87)',
      disabled: 'rgba(0, 0, 0, 0.27)',
      midEmphasis: 'rgba(0, 0, 0, 0.54)',
    },
    light: {
      default: 'rgba(255, 255, 255, 0.87)',
      disabled: 'rgba(255, 255, 255, 0.27)',
      midEmphasis: 'rgba(255, 255, 255, 0.54)',
    },
  },
  fontFaces: {
    default: ['Roboto', 'sans-serif'],
  },
  shadows: {
    flat: 'none',
    raised: '0 3px 11px 0 rgba(0, 0, 0, 0.21)',
  },
  textStyles: {
    title: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '28px',
      fontWeight: 700,
    },
    h1: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '24px',
      fontWeight: 400,
    },
    h2: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '20px',
      fontWeight: 500,
    },
    h3: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '16px',
      fontWeight: 400,
    },
    h4: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '14px',
      fontWeight: 700,
    },
    body: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '14px',
      fontWeight: 400,
    },
    p: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '12px',
      fontWeight: 400,
    },
    paragraph: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '12px',
      fontWeight: 400,
    },
    caption: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '10px',
      fontWeight: 400,
    },
    button: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '12px',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    textLink: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: '12px',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },
  sizes: {
    '2Xs': '4px',
    xs: '8px',
    s: '12px',
    r: '16px',
    m: '20px',
    l: '24px',
    xl: '32px',
    '2Xl': '40px',
  },
  verticalGridSize: '16px',
  raw: {
    colors: {
      primary: {
        name: 'SCM Purple',
        value: [
          'hsl(244, 47, 32)',
          'hsl(244, 54, 53)',
          'hsl(244, 54, 72)',
          'hsl(244, 54, 93)',
        ],
      },
      success: {
        name: 'success',
        value: [
          'hsl(137, 31, 33)',
          'hsl(138, 38, 55)',
          'hsl(137, 38, 73)',
          'hsl(139, 38, 89)',
        ],
      },
      warning: {
        name: 'warning',
        value: [
          'hsl(40, 48, 38)',
          'hsl(39, 84, 64)',
          'hsl(40, 84, 78)',
          'hsl(40, 83, 91)',
        ],
      },
      danger: {
        name: 'danger',
        value: [
          'hsl(2, 34, 37)',
          'hsl(1, 56, 62)',
          'hsl(2, 56, 77)',
          'hsl(2, 55, 90)',
        ],
      },
      gray: {
        name: 'Gray',
        value: [
          'hsl(0, 0, 83)',
          'hsl(0, 0, 90)',
          'hsl(0, 0, 93)',
          'hsl(220, 22, 96)',
          'hsl(0, 0, 98)',
        ],
      },
    },
    textColor: {
      dark: {
        name: 'Black',
        value: [
          'rgba(0, 0, 0, 0.87)',
          'rgba(0, 0, 0, 0.54)',
          'rgba(0, 0, 0, 0.27)',
        ],
      },
      light: {
        name: 'White',
        value: [
          'rgba(255, 255, 255, 0.87)',
          'rgba(255, 255, 255, 0.54)',
          'rgba(255, 255, 255, 0.27)',
        ],
      },
    },
    shadow: {
      flat: {
        value: 'none',
      },
      raised: {
        value: '0 3px 11px 0 rgba(0, 0, 0, 0.21)',
      },
    },
    fontFamily: {
      default: {
        name: 'Roboto',
        value: ['Roboto', 'sans-serif'],
      },
    },
    textStyle: {
      title: {
        name: 'Title',
        value: {
          fontFamily: 'default',
          fontSize: 28,
          fontWeight: 700,
        },
      },
      h1: {
        name: 'H1',
        value: {
          fontFamily: 'default',
          fontSize: 24,
          fontWeight: 400,
        },
      },
      h2: {
        name: 'H2',
        value: {
          fontFamily: 'default',
          fontSize: 20,
          fontWeight: 500,
        },
      },
      h3: {
        name: 'H3',
        value: {
          fontFamily: 'default',
          fontSize: 16,
          fontWeight: 400,
        },
      },
      h4: {
        name: 'H4',
        value: {
          fontFamily: 'default',
          fontSize: 14,
          fontWeight: 700,
        },
      },
      body: {
        name: 'Body',
        value: {
          fontFamily: 'default',
          fontSize: 14,
          fontWeight: 400,
        },
      },
      p: {
        name: 'Paragraph',
        value: {
          fontFamily: 'default',
          fontSize: 12,
          fontWeight: 400,
        },
      },
      paragraph: {
        name: 'Paragraph',
        value: {
          fontFamily: 'default',
          fontSize: 12,
          fontWeight: 400,
        },
      },
      caption: {
        name: 'Caption',
        value: {
          fontFamily: 'default',
          fontSize: 10,
          fontWeight: 400,
        },
      },
      button: {
        description: 'Button',
        value: {
          fontFamily: 'default',
          fontSize: 12,
          fontWeight: 500,
          textTransform: 'uppercase',
        },
      },
      textLink: {
        name: 'Text Link',
        value: {
          fontFamily: 'default',
          fontSize: 12,
          fontWeight: 500,
          textTransform: 'uppercase',
        },
      },
    },
    size: {
      '2Xs': 4,
      xs: 8,
      s: 12,
      r: 16,
      m: 20,
      l: 24,
      xl: 32,
      '2Xl': 40,
    },
    grid: {
      value: 16,
    },
  },
}
