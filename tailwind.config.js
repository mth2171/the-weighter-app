/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        menuitem: "#23E0E2",
        button: "#06CFCB",
        hover: "#8EC1C6",
        op: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
