import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [
    typography
  ],
  darkMode: 'class'
}

