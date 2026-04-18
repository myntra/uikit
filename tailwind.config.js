/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Colors use the <alpha-value> placeholder so Tailwind opacity modifiers
      // (e.g. bg-primary/90) work correctly with CSS custom properties.
      colors: {
        border:      'hsl(var(--aui-border) / <alpha-value>)',
        input:       'hsl(var(--aui-input) / <alpha-value>)',
        ring:        'hsl(var(--aui-ring) / <alpha-value>)',
        background:  'hsl(var(--aui-background) / <alpha-value>)',
        foreground:  'hsl(var(--aui-foreground) / <alpha-value>)',
        primary: {
          DEFAULT:    'hsl(var(--aui-primary) / <alpha-value>)',
          foreground: 'hsl(var(--aui-primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT:    'hsl(var(--aui-primary) / <alpha-value>)',
          foreground: 'hsl(var(--aui-primary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT:    'hsl(var(--aui-destructive) / <alpha-value>)',
          foreground: 'hsl(var(--aui-destructive-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT:    'hsl(var(--aui-warning) / <alpha-value>)',
          foreground: 'hsl(var(--aui-warning-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT:    'hsl(var(--aui-success) / <alpha-value>)',
          foreground: 'hsl(var(--aui-success-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT:    'hsl(var(--aui-muted) / <alpha-value>)',
          foreground: 'hsl(var(--aui-muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT:    'hsl(var(--aui-accent) / <alpha-value>)',
          foreground: 'hsl(var(--aui-accent-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--aui-radius)',
        lg:      'var(--aui-radius)',
        md:      'calc(var(--aui-radius) + 2px)',
        sm:      'var(--aui-radius)',
      },
      ringOffsetColor: {
        background: 'hsl(var(--aui-background))',
      },
      keyframes: {
        'button-press': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':       { transform: 'scale(0.97)' },
        },
      },
      animation: {
        'button-press': 'button-press 150ms ease-in-out',
      },
    },
  },
  plugins: [],
}
