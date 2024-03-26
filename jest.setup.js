import "@testing-library/jest-dom";

const nextRouterMock = require("next-router-mock");

jest.mock("next/router", () => nextRouterMock);
