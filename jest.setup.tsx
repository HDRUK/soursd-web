import { defineMatchMedia } from "@/utils/testUtils";
import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import "./jest.utils";
import { forwardRef, useImperativeHandle } from "react";
import { ResponseMessageType } from "./src/consts/requests";
import { mockedPermission } from "./mocks/data/permission";
import {
  mockedEducation,
  mockedTraining,
  mockedUser,
  mockedAccreditation,
  mockedEmployment,
  mockedProject,
} from "./mocks/data/user";
import { mockedOrganisation } from "./mocks/data/organisation";
import {
  mockedSystemConfig,
  mockedValidationSchema,
} from "./mocks/data/systemConfig";
import { getRoutes } from "./src/utils/router";
import { ROUTES } from "./src/consts/router";

const nextRouterMock = require("next-router-mock");

jest.mock("next/router", () => nextRouterMock);
jest.mock("./src/context/ApplicationData", () => ({
  ...jest.requireActual("./src/context/ApplicationData"),
  useApplicationData: () => ({
    validationSchema: mockedValidationSchema(),
    routes: getRoutes(ROUTES, "en"),
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

function mock200Json(data) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      message: ResponseMessageType.SUCCESS,
      data,
    }),
  };
}

function mockPagedResults(data) {
  return {
    current_page: 1,
    data,
  };
}

async function mockFetch(url) {
  const formattedUrl = url.toLowerCase();

  switch (formattedUrl) {
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/1`: {
      return mock200Json(
        mockedUser({
          id: 1,
        })
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/educations/1`: {
      return mock200Json([
        mockedEducation({
          id: 1,
        }),
        mockedEducation({
          id: 2,
        }),
      ]);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/training/1`: {
      return mock200Json([
        mockedTraining({
          id: 1,
        }),
        mockedTraining({
          id: 2,
        }),
      ]);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/accreditations/1`: {
      return mock200Json(
        mockPagedResults([
          mockedAccreditation({
            id: 1,
          }),
          mockedAccreditation({
            id: 2,
          }),
        ])
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/employments/1`: {
      return mock200Json([
        mockedEmployment({
          id: 1,
        }),
        mockedEmployment({
          id: 2,
        }),
      ]);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/1`: {
      return mock200Json(
        mockPagedResults([
          mockedProject({
            id: 1,
          }),
          mockedProject({
            id: 2,
          }),
        ])
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations`: {
      return mock200Json({
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
      });
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/permissions`: {
      return mock200Json([
        mockedPermission({
          id: 1,
        }),
        mockedPermission({
          id: 2,
        }),
      ]);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/researcher`: {
      return mock200Json(true);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/researcher/1/issuer/1`: {
      return mock200Json(true);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisation/1`: {
      return mock200Json(mockedOrganisation());
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/1/idvt`: {
      return mock200Json({
        idvt_result: true,
      });
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/permissions`: {
      return mock200Json([
        mockedOrganisation({
          id: 1,
        }),
        mockedOrganisation({
          id: 2,
        }),
      ]);
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
        return mock200Json(null);
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
