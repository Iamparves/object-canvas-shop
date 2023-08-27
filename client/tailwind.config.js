/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "15px",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1170px",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#34A5E4",
        "dark-800": "#1E2A39",
        "dark-900": "#10100E",
        bodyBg: "#F3F4F6",
      },
    },
  },
  plugins: [require("daisyui")],
};
