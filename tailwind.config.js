/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          green: {
            default: "#3DE701",
            hover: '#FFFFFF',
            disabled: "#DBEAD6"
          },
          black: {
            default: "#161616",
            title: "#E1E1E6",
            input: "#C4C4CC"
          }
        }
      }
    },
  },
  plugins: [],
};
