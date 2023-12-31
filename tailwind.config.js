// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        key: "#00798C",
        light: "#609AA3",
      },
      fontFamily: {
        pre: ["Pretendard"],
      },
    },
  },
  plugins: [],
};
