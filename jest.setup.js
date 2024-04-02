import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import { makeServer } from "./mocks/server";

const nextRouterMock = require("next-router-mock");

jest.mock("next/router", () => nextRouterMock);

const server = makeServer();

afterAll(() => {
  server.shutdown();
});
