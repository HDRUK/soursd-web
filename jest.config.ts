const nextJest = require("next/jest");

process.env.TZ = "UTC";

process.env = Object.assign(process.env, {
  NEXT_PUBLIC_KEYCLOAK_REALM: "my-realm",
  NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: "my-client-id",
  NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET: "my-client-secret",
  NEXT_PUBLIC_KEYCLOAK_BASE_URL: "https://example.com",
  NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGIN: "https://example.com/login-callback",
  NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGOUT: "https://example.com/logout-callback",
});

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/mocks/(.*)$": "<rootDir>/mocks/$1",
    "^@/queries/(.*)$": "<rootDir>/src/queries/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/images/(.*)$": "<rootDir>/src/images/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/consts/(.*)$": "<rootDir>/src/consts/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/providers/(.*)$": "<rootDir>/src/providers/$1",
    "^@/data/(.*)$": "<rootDir>/src/data/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/context/(.*)$": "<rootDir>/src/context/$1",
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
    "<rootDir>/src/data",
    "<rootDir>/src/types",
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
