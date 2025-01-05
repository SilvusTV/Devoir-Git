/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "colors": {
        "primary": {
          "50": "#f0f6fc",
          "100": "#3d444d",
          "200": "#262c36",
          "300": "#212830",
          "400": "#151b23",
          "500": "#0d1117",
        },
        "secondary": {
          "500": "#4493f8"
        },
        "active": {
          "400": "#29903b",
          "500": "#238636",
        },
        "danger": {
          "500": "#b62324",
          "800":"#6b2a2b"
        }
      },
    },
  },
  plugins: [],
};
