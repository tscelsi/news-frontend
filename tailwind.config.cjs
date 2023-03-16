/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "blak": "4px 4px 0px #000000",
        "green": "4px 4px 0px #22c55e",
        "blue": "4px 4px 0px #3b82f6",
        "purple": "4px 4px 0px #a855f7",
        "red": "4px 4px 0px #ef4444",
      },
      fontFamily: {
        'satoshi': ['satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

module.exports = config;
