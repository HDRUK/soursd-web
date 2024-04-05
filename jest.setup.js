import { defineMatchMedia } from "@/utils/testUtils";
import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import { makeServer } from "./mocks/server";

const nextRouterMock = require("next-router-mock");

jest.mock("next/router", () => nextRouterMock);

const server = makeServer();

global.matchMedia = () => {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};

beforeAll(() => {
  defineMatchMedia(1024);
});

afterAll(() => {
  server.shutdown();
});
