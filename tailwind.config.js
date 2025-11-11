/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: {
          DEFAULT: '#0b0b0b',
          lighter: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
}
