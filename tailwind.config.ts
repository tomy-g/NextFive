import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      'c-text': '#ffffff',
      'c-background': '#060606',
      'c-primary': '#72cf24',
      'c-secondary': '#274141',
      'c-secondary-200': '#afcfcf',
      'c-secondary-400': '#ffffff',
      'c-secondary-900': '#132020',
      'c-accent': '#06da41',
      transparent: 'transparent',
      current: 'currentColor'
    },
    extend: {
    },
  },
  rules: {
    indent: ['error', 4]
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      light: {
        layout: {},
        colors: {}
      },
      dark: {
        layout: {
          radius: {
            small: '4px', // default 8px
            medium: '8px', // default 12px
            large: '14px', // default 14px
          },
        },
        // colors: {
        //   foreground: '#ffffff',
        //   primary: '#80d837',
        //   background: '#060606',
        //   secondary: '#2d4141',
        //   success: '#24da57',
        // }
      },
    }
  })]
}
export default config
