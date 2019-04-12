module.exports = {
  colors: {
    primary: {
      dark: 'hsl(244, 64, 47)',
      base: 'hsl(244, 65, 78)',
      text: 'hsla(244, 65, 78, 0.87)',
      light: 'hsl(244, 35, 87)',
      lighter: 'hsl(244,  8, 97)',
    },
    green: {
      dark: 'hsl(137, 47, 43)',
      base: 'hsl(137, 48, 72)',
      text: 'hsla(137, 48, 72, 0.87)',
      light: 'hsl(137, 25, 83)',
      lighter: 'hsl(137,  9, 93)',
    },
    yellow: {
      dark: 'hsl(40, 65, 43)',
      base: 'hsl(40, 65, 94)',
      text: 'hsla(40, 65, 94, 0.87)',
      light: 'hsl(40, 38, 96)',
      lighter: 'hsl(40, 16, 98)',
    },
    red: {
      dark: 'hsl(2, 51, 50)',
      base: 'hsl(2, 51, 83)',
      text: 'hsla(2, 51, 83, 0.87)',
      light: 'hsl(2, 32, 90)',
      lighter: 'hsl(2, 11, 96)',
    },
    gray: {
      dark: 'hsl(2, 51, 50)',
      base: 'hsl(2, 51, 83)',
      text: 'hsla(2, 51, 83, 0.87)',
      light: 'hsl(2, 32, 90)',
      lighter: 'hsl(2, 11, 96)',
      lightest: 'hsl(2, 11, 96)',
    },
  },
  textColors: {
    dark: {
      default: 'rgba(0, 0, 0, 0.87)',
      disabled: 'rgba(0, 0, 0, 0.27)',
      trivial: 'rgba(0, 0, 0, 0.54)',
    },
    light: {
      default: 'rgba(255, 255, 255, 0.87)',
      disabled: 'rgba(255, 255, 255, 0.27)',
      trivial: 'rgba(255, 255, 255, 0.54)',
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
    color: {
      primary: {
        name: 'SCM Purple',
        value: [
          'hsl(244, 64, 47)',
          'hsl(244, 65, 78)',
          'hsl(244, 35, 87)',
          'hsl(244,  8, 97)',
        ],
      },
      green: {
        name: 'Green',
        value: [
          'hsl(137, 47, 43)',
          'hsl(137, 48, 72)',
          'hsl(137, 25, 83)',
          'hsl(137,  9, 93)',
        ],
      },
      yellow: {
        name: 'Yellow',
        value: [
          'hsl(40, 65, 43)',
          'hsl(40, 65, 94)',
          'hsl(40, 38, 96)',
          'hsl(40, 16, 98)',
        ],
      },
      red: {
        name: 'Red',
        value: [
          'hsl(2, 51, 50)',
          'hsl(2, 51, 83)',
          'hsl(2, 32, 90)',
          'hsl(2, 11, 96)',
        ],
      },
      gray: {
        name: 'Red',
        value: [
          'hsl(2, 51, 50)',
          'hsl(2, 51, 83)',
          'hsl(2, 32, 90)',
          'hsl(2, 11, 96)',
          'hsl(2, 11, 96)',
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
