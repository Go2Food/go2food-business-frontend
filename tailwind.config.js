/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
            'nav-bars-menu-popup': {
              '0%' : {opacity: 0},
              '100%': {opacity: 1}
            },
        },
        animation: {
          'nav-bars-menu-popup': 'nav-bars-menu-popup 0.250s ease-in-out forwards',
        }
      }
    },
    plugins: [],
  }