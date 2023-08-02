/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from 'tailwindcss-animated';
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFA500',
        secondary: '#4B0082',
      },
    },
  },
  plugins: [
    tailwindcssAnimated,
  ],
}

