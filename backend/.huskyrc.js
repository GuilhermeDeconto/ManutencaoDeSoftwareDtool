
module.exports = {
  hooks: {
    "pre-commit": "npm run format:staged",
    "pre-push": "npm run lint",
  }
};
