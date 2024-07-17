import { defineMatchMedia } from "@/utils/testUtils";
import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import { forwardRef, useImperativeHandle } from "react";
import { ResponseMessageType } from "./src/consts/requests";
import { mockedPermission } from "./mocks/data/permission";
import { mockedUser } from "./mocks/data/user";
import { mockedOrganisation } from "./mocks/data/organisation";
import {
  mockedSystemConfig,
  mockedValidationSchema,
} from "./mocks/data/systemConfig";

const nextRouterMock = require("next-router-mock");

jest.mock("next/router", () => nextRouterMock);
jest.mock("./src/context/ApplicationData", () => ({
  ...jest.requireActual("./src/context/ApplicationData"),
  useApplicationData: () => ({
    validationSchema: mockedValidationSchema(),
  }),
}));

jest.mock("react-google-recaptcha", () => {
  const RecaptchaV2 = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      getValue: jest.fn(() => true),
      reset: jest.fn(),
      execute: jest.fn(),
      executeAsync: jest.fn(() => "token"),
    }));

    return (
      <input
        ref={ref}
        type="checkbox"
        id="recapture"
        data-testid="recaptcha"
        aria-label="recaptcha"
        {...props}
      />
    );
  });

  return RecaptchaV2;
});

global.matchMedia = () => {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};

async function mockFetch(url) {
  switch (url) {
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/1`: {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          message: ResponseMessageType.SUCCESS,
          data: mockedUser({
            id: 1,
          }),
        }),
      };
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations`: {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          message: ResponseMessageType.SUCCESS,
          data: {
            data: [
              mockedOrganisation({
                organisation_name: "Organisation 1",
                id: 1,
              }),
              mockedOrganisation({
                organisation_name: "Organisation 2",
                id: 2,
              }),
            ],
          },
        }),
      };
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/permissions`: {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          message: ResponseMessageType.SUCCESS,
          data: [
            mockedPermission({
              id: 1,
            }),
            mockedPermission({
              id: 2,
            }),
          ],
        }),
      };
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/permissions`: {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          message: ResponseMessageType.SUCCESS,
          data: [
            mockedOrganisation({
              id: 1,
            }),
            mockedOrganisation({
              id: 2,
            }),
          ],
        }),
      };
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/system_config`:
      return {
        ok: true,
        status: 200,
        json: async () => ({
          message: ResponseMessageType.SUCCESS,
          data: mockedSystemConfig(),
        }),
      };
    default: {
      if (url.includes("/test")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            message: ResponseMessageType.SUCCESS,
            data: null,
          }),
        };
      }

      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

beforeAll(() => {
  defineMatchMedia(1024);

  global.fetch = jest.fn();
});

beforeEach(() => global.fetch.mockImplementation(mockFetch));
