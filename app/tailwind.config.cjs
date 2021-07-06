const { colors } = require("tailwindcss");

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

module.exports = config;
