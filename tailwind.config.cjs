/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "blak": "4px 4px 0px #000000",
      }
    },
  },
  plugins: [],
};

module.exports = config;
