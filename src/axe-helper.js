const { configureAxe } = require("jest-axe");

const axe = configureAxe({
  impactLevels: ["critical"],
});

module.exports = axe;
