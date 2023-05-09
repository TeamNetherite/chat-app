import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.svelte'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'gg sans',
          'Noto Sans',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        code: [
          'JetBrainsMono Nerd Font Mono',
          'Consolas',
          'Andale Mono WT',
          'Andale Mono',
          'Lucida Console',
          'Lucida Sans Typewriter',
          'DejaVu Sans Mono',
          'Bitstream Vera Sans Mono',
          'Liberation Mono',
          'Nimbus Mono L',
          'Monaco',
          'Courier New',
          'Courier',
          'monospace',
        ],
        heading: [
          'ABC Ginto Nord',
          'Noto Sans',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        headingSecondary: [
          'Montserrat',
          'ABC Ginto Nord',
          'Noto Sans',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        rubik: ['Rubik', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        seasalt: '#f6f6f6',
        red: {
          bittersweet: '#FF5050',
        },
        orange: {
          scarlet: '#FC2F00',
        },
        yellow: {
          selective: '#FFBC0A',
        },
        blue: {
          celestial: '#49afe2',
        },
        background: '#111111',
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
          netherite: '#4D4143',
          'netherite-outline': '#3E3232'
        },
      },
    },
  },
  plugins: [typography],
  darkMode: 'class',
}
