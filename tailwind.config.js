/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Add other plugins here if needed
  ],
  corePlugins: {
    // No need to specify preflight in v3, it's enabled by default
  },
}
