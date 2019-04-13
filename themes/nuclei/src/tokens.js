module.exports = {
  colors: {
    primary: {
      dark: 'hsl(244, 47, 32)',
      base: 'hsl(244, 54, 53)',
      text: 'hsla(244, 54, 53, 0.87)',
      light: 'hsl(244, 54, 72)',
      lighter: 'hsl(244, 54, 93)',
    },
    green: {
      dark: 'hsl(137, 31, 33)',
      base: 'hsl(138, 38, 55)',
      text: 'hsla(138, 38, 55, 0.87)',
      light: 'hsl(137, 38, 73)',
      lighter: 'hsl(139, 38, 89)',
    },
    yellow: {
      dark: 'hsl(40, 48, 38)',
      base: 'hsl(39, 84, 64)',
      text: 'hsla(39, 84, 64, 0.87)',
      light: 'hsl(40, 84, 78)',
      lighter: 'hsl(40, 83, 91)',
    },
    red: {
      dark: 'hsl(2, 34, 37)',
      base: 'hsl(1, 56, 62)',
      text: 'hsla(1, 56, 62, 0.87)',
      light: 'hsl(2, 56, 77)',
      lighter: 'hsl(2, 55, 90)',
    },
    gray: {
      dark: 'hsl(0, 0, 83)',
      base: 'hsl(0, 0, 90)',
      text: 'hsla(0, 0, 90, 0.87)',
      light: 'hsl(0, 0, 93)',
      lighter: 'hsl(220, 22, 96)',
      lightest: 'hsl(0, 0, 98)',
    },
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
          'hsl(244, 47, 32)',
          'hsl(244, 54, 53)',
          'hsl(244, 54, 72)',
          'hsl(244, 54, 93)',
        ],
      },
      green: {
        name: 'Green',
        value: [
          'hsl(137, 31, 33)',
          'hsl(138, 38, 55)',
          'hsl(137, 38, 73)',
          'hsl(139, 38, 89)',
        ],
      },
      yellow: {
        name: 'Yellow',
        value: [
          'hsl(40, 48, 38)',
          'hsl(39, 84, 64)',
          'hsl(40, 84, 78)',
          'hsl(40, 83, 91)',
        ],
      },
      red: {
        name: 'Red',
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
