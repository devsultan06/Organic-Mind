/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD43A",
        darkblack: "#111111",
        white2: "#ebebeb",
      },
    },
  },
  plugins: [],
};
