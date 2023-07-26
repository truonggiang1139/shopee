// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        crimson: "#C92127",
        outline: "#f5f5fa"
      },
      boxShadow: {
        product: "rgba(0, 0, 0, 0.1) 0px 0px 20px"
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          maxWidth: theme("columns.7xl"),
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4")
        }
      });
    })
  ]
};
