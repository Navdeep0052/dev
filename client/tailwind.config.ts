import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f1f5',
          100: '#d9dbe6',
          200: '#b3b7cd',
          300: '#8d93b4',
          400: '#676f9b',
          500: '#414b82',
          600: '#2a3366',
          700: '#1a2350',
          800: '#121a3a',
          900: '#0f172a',
          950: '#0a0f1e',
        },
        gold: {
          50: '#fdf9ed',
          100: '#f9f0cc',
          200: '#f3e199',
          300: '#edd266',
          400: '#e7c333',
          500: '#c9a227',
          600: '#a3831f',
          700: '#7d6417',
          800: '#57450f',
          900: '#312608',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
