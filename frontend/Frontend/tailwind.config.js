// tailwind.config.mjs
import PrimeUI from 'tailwindcss-primeui';

export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [PrimeUI],
}
