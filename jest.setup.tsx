import { UserFeedSource } from "@/consts/user";
import { StoreState, useStore } from "@/data/store";
import { defineMatchMedia } from "@/utils/testUtils";
import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import * as matchers from "jest-extended";
import { forwardRef, useImperativeHandle } from "react";
import "./jest.utils";
import { mock200Json, mockPagedResults } from "./jest.utils";
import { mockedCustodian, mockedCustodianUser } from "./mocks/data/custodian";
import { mockedNotification } from "./mocks/data/notification";
import { TextEncoder } from 'util';
import { mockedOrganisation } from "./mocks/data/organisation";
import { mockedPermission } from "./mocks/data/permission";
import { mockedProject, mockedProjects } from "./mocks/data/project";
import { mockedApiPermissions, mockedStoreState } from "./mocks/data/store";
import {
  mockedSystemConfig,
  mockedValidationSchema,
} from "./mocks/data/systemConfig";
import {
  mockedAccreditation,
  mockedAffiliation,
  mockedEducation,
  mockedEmployment,
  mockedTraining,
  mockedUser,
} from "./mocks/data/user";
import { ResponseMessageType } from "./src/consts/requests";
import { ROUTES } from "./src/consts/router";

const nextRouterMock = require("next-router-mock");

(() => {
  const originalConsole = global.console;

  global.console = {
    ...global.console,

    error: (...args) => {
      if (
        typeof args[0] === "string" &&
        (args[0].includes("for a non-boolean attribute") ||
          args[0].includes("`fullWidth` prop on a DOM element"))
      ) {
        return true;
      }

      // Show the original error for everything else
      originalConsole.error(...args);
    },
  };
})();

expect.extend(matchers);

jest.mock("next/router", () => nextRouterMock);
jest.mock("./src/context/ApplicationData", () => ({
  ...jest.requireActual("./src/context/ApplicationData"),
  useApplicationData: () => ({
    validationSchema: mockedValidationSchema(),
    routes: ROUTES,
  }),
}));

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
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

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

const useStoreMock = jest.mocked(useStore);

export const mockUseStore = (props: Partial<StoreState> = {}) => {
  useStoreMock.mockImplementation(getterFn => {
    const originalStore = jest.requireActual("@/data/store").useStore();
    const state = mockedStoreState();

    Object.keys(props).forEach(propKey => {
      if (propKey !== "config")
        originalStore[propKey] = props[propKey as keyof StoreState];
    });

    // Must mutate to keep references
    originalStore.config = {
      ...originalStore.config,
      ...state.config,
      ...props.config,
      histories: {
        ...originalStore.config.histories,
        ...state.config.histories,
        ...props.config?.histories,
      },
    };

    return getterFn ? getterFn(originalStore) : originalStore;
  });
};

global.TextEncoder = TextEncoder;


async function mockFetch(url: string, init?: RequestInit) {
  const [baseUrl, queryString] = url.split("?");
  const queryParams = Object.fromEntries(new URLSearchParams(queryString));
  const page = Number(queryParams.page) || 1;
  const perPage = Number(queryParams.per_page) || 25;

  switch (baseUrl) {
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/permissions`: {
      return mock200Json(mockPagedResults(mockedApiPermissions));
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/1`: {
      return mock200Json(
        mockedCustodianUser({
          id: 1,
        })
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users`: {
      if (init?.method === "POST") {
        return mock200Json(1);
      }

      return mock200Json([
        mockedCustodianUser({
          id: 1,
          created_at: "2024-01-01T00:00:00.000",
          first_name: "John",
          last_name: "Smith",
        }),
        mockedCustodianUser({
          id: 2,
        }),
      ]);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/1`: {
      return mock200Json(
        mockedUser({
          id: 1,
        })
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/1/notifications`: {
      return mock200Json(
        mockPagedResults(
          [
            ...Array.from({ length: 10 }, () => mockedNotification(true)),
            ...Array.from({ length: 10 }, () => mockedNotification(false)),
          ],
          page,
          perPage
        )
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/1/notifications/count`: {
      return mock200Json({
        total: 20,
        read: 10,
        unread: 10,
      });
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users`: {
      return mock200Json(
        mockPagedResults([
          mockedUser({
            id: 1,
            created_at: "2024-01-01 00:00:00",
            feed_source: UserFeedSource.ORG,
            first_name: "John",
            last_name: "Smith",
          }),
          mockedUser({
            id: 2,
          }),
        ])
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/2`: {
      return mock200Json(
        mockedUser({
          id: 2,
          orcid_scanning: true,
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
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/training/registry/1`: {
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
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/projects`: {
      return mock200Json(mockPagedResults(mockedProjects(10), page, perPage));
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/user/1/approved`: {
      return mock200Json({
        data: [
          mockedProject({
            id: 1,
          }),
          mockedProject({
            id: 2,
          }),
        ],
      });
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/1/projects`: {
      return mock200Json(mockPagedResults(mockedProjects(5)));
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/1/projects`: {
      return mock200Json(mockPagedResults(mockedProjects(10)));
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/2/projects`: {
      return mock200Json(mockPagedResults(mockedProjects(10)));
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
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/affiliations/1`: {
      return mock200Json(
        mockPagedResults([
          mockedAffiliation({
            id: 1,
          }),
          mockedAffiliation({
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
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians`: {
      return mock200Json(1);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/1/invite`: {
      return mock200Json(
        mockedCustodian({
          id: 1,
        })
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/unclaimed`: {
      return mock200Json(1);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/1/invite`: {
      return mock200Json({
        data: mockedOrganisation({
          id: 1,
        }),
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
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/users/invite`: {
      return mock200Json(
        mockedUser({
          id: 1,
        })
      );
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/researcher`: {
      return mock200Json(true);
    }
    case `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/researcher/1/custodian/1`: {
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
    case `/api/auth/token`:
    return {
      ok: true,
      status: 200,
      json: async () => ({
        access_token: 'fake-access-token'
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
  global.mockUseStore = mockUseStore;
});

beforeEach(() => {
  global.fetch.mockImplementation(mockFetch);
  global.mockUseStore();
});
