const { colors } = require("tailwindcss");

const config = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

module.exports = config;
