
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#011235',
        secondary: '#464646',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}