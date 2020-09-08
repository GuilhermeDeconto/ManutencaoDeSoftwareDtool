
module.exports = function(api) {
  api.cache(() => process.env.NODE_ENV === "development");

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current"
          }
        }
      ]
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties"
    ]
  };
}
