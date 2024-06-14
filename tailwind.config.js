/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.{js,jsx,ts,tsx,vue}",
    "./resources/**/*.blade.php",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

