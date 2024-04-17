import { renderHook } from "@/utils/testUtils";
import useAuth from ".";

const mockGet = jest.fn();

jest.mock("next/headers", () => {
  return {
    // <-- this object gets returned by `import('next/headers')`
    headers: () => {
      return {
        get: mockGet,
      };
    },
  };
});

const RouterConsts = jest.requireMock("@/consts/router");

jest.mock("@/consts/router", () => ({
  PROTECTED_ROUTES: [],
}));

describe("useAuth", () => {
  it("validates the current users role", async () => {
    RouterConsts.PROTECTED_ROUTES = [
      {
        path: "/[locale]/contact",
        permissions: [
          {
            role: "researcher",
            state: "view",
          },
        ],
      },
    ];

    mockGet.mockReturnValue("http://localhost:3000/en/contact");

    const { result } = renderHook(() => useAuth());

    expect(result.current).toEqual({
      isValid: false,
    });
  });

  it("invalidates the current users role", async () => {
    RouterConsts.PROTECTED_ROUTES = [
      {
        path: "/[locale]/contact",
        permissions: [
          {
            role: "operational_hdr",
            state: "view",
          },
        ],
      },
    ];

    mockGet.mockReturnValue("http://localhost:3000/en/contact");

    const { result } = renderHook(() => useAuth());

    expect(result.current).toEqual({
      isValid: true,
    });
  });
});
