import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  // theme: {
  //   colors: {
  //     'c-text': 'var(--c-text)',
  //     'c-background': 'var(--c-background)',
  //     'c-primary': '#72cf24',
  //     'c-secondary': '#274141',
  //     'c-secondary-200': 'var(c-secosndary-200)',
  //     'c-secondary-400': '#ffffff',
  //     'c-secondary-900': '#132020',
  //     'c-accent': '#06da41',
  //     transparent: 'transparent',
  //     current: 'currentColor'
  //   },
  //   extend: {
  //   },
  // },
  rules: {
    indent: ['error', 4]
  },
  // darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        'five-dark': {
          extend: 'dark',
          colors: {
            foreground: {
              100: '#4d4d4d',
              200: '#8c8c8c',
              DEFAULT: '#ffffff'
            },
            primary: '#72cf24',
            background: {
              100: '#1a1a1a',
              DEFAULT: '#060606'
            },
            secondary: {
              50: '#132020',
              100: '#1d3030',
              200: '#274141',
              300: '#274141',
              400: '#274141',
              500: '#274141',
              600: '#274141',
              700: '#274141',
              800: '#274141',
              900: '#274141',
              DEFAULT: '#8fbcbc',
              foreground: '#ffffff'
            },
            focus: '#06DA41',
            default: {
              200: '#274141',
              400: '#478217', // primary shade
              DEFAULT: '#274141'
            }
          },
          layout: {
            radius: {
              small: '4px', // default 8px
              medium: '8px', // default 12px
              large: '14px' // default 14px
            }
          }
        },
        'five-light': {
          extend: 'light',
          layout: {},
          colors: {}
        }
      }
    })
  ]
}
export default config
