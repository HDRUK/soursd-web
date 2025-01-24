import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { screen, render, waitFor, fireEvent } from "@/utils/testUtils";
import { commonAccessibilityTests } from "@/utils/testUtils";
import NotificationsMenu from "./NotificationsMenu";

const defaultUser = mockedUser({
  id: 1,
});

jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

describe("<NotificationsMenu />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /*it("renders the notifications icon with a badge count", async () => {
    render(<NotificationsMenu />);
    expect(screen.getByTestId("notifications-button")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("notifications-badge")).toHaveTextContent("10");
    });
  });*/

  it("opens and displays notifications when clicked", async () => {
    render(<NotificationsMenu />);
    fireEvent.click(screen.getByTestId("notifications-button"));
    await waitFor(() => {
      expect(screen.getByTestId("notifications-menu")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("notification-item")).toHaveLength(5);
    });

    screen.debug();

    //
  });

  /*it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<NotificationsMenu />));
  });*/
});
