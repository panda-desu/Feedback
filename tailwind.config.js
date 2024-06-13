/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "underline-gradient": "linear-gradient(90deg, #7277FF, #A55FFF)",
      },
      blur: {
        "35%": "35%",
      },
    },
  },
  plugins: [],
};
