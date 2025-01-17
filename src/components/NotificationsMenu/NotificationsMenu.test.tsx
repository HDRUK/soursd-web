import { useCookies } from "@/context/CookieContext";
import { useStore } from "@/data/store";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import { mockedUser } from "@/mocks/data/user";
import { render, waitFor } from "@/utils/testUtils";
import NotificationsMenu from "./NotificationsMenu";

const defaultUser = mockedUser({
  id: 1,
});

const mockRefetch = jest.fn();
const mockCancel = jest.fn();

jest.mock("@/context/CookieContext", () => ({
  useCookies: jest.fn(),
}));

const mockGetCookie = jest.fn().mockReturnValue(undefined);

(useCookies as jest.Mock).mockReturnValue({
  getCookie: mockGetCookie,
});

jest.mock("@/data/store");
jest.mock("@/hooks/useQueryRefetch");

(useQueryRefetch as unknown as jest.Mock).mockImplementation(() => ({
  refetch: mockRefetch,
  cancel: mockCancel,
}));

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

describe("<NotificationsMenu />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("cancels a refetch", async () => {
    render(<NotificationsMenu />);

    await waitFor(() => {
      expect(mockCancel).toHaveBeenCalled();
    });
  });

  it("triggers a refetch", async () => {
    render(<NotificationsMenu />);

    (useStore as unknown as jest.Mock).mockReturnValue({
      ...defaultUser,
      id: 2,
    });

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
