module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  plugins: ["@babel/plugin-proposal-async-generator-functions"],
  env: {
    production: {
      presets: ["minify"],
    },
  },
};
