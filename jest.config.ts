const nextJest = require("next/jest");

process.env.TZ = "UTC";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/mocks/(.*)$": "<rootDir>/mocks/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/images/(.*)$": "<rootDir>/src/images/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/consts/(.*)$": "<rootDir>/src/consts/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/providers/(.*)$": "<rootDir>/src/providers/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage",
    "<rootDir>/dist",
    "<rootDir>/src/utils/testUtils.tsx",
    "<rootDir>/src/consts",
    "<rootDir>/src/config",
    ".*mockData\\.ts(x)$",
    ".*\\.styles\\.ts$",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/utils/testUtils.tsx",
    "<rootDir>/node_modules",
    "<rootDir>/mocks",
    "<rootDir>/src/consts",
    "<rootDir>/src/config",
    ".*mockData\\.ts(x)$",
    ".*\\.styles\\.ts$",
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  globals: {
    fetch: global.fetch,
  },
};

module.exports = createJestConfig(customJestConfig);
