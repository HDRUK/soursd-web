import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import Completion from "./Completion";

jest.mock("@/data/store");

const mockSetUser = jest.fn();

const defaultUser = mockedUser({
  profile_steps_completed: `
    {"identity": {"dob": false, "score": 67, "last_name": true, "first_name": true}}
  `,
  profile_completed_at: null,
});

(useStore as unknown as jest.Mock).mockReturnValue([defaultUser, mockSetUser]);

describe("<Completion />", () => {
  // commonAccessibilityTests(render(<Completion />));

  it("has the correct values", async () => {
    render(<Completion />);

    await waitFor(() => {
      expect(screen.getByText("Identity")).toBeInTheDocument();
      expect(screen.getByText("67% complete")).toBeInTheDocument();
    });
  });

  it("has the correct values", async () => {
    render(<Completion />);

    const link = screen.getAllByRole("link", {
      name: "Continue",
    })[0];

    await waitFor(() => {
      expect(link).toHaveAttribute(
        "href",
        `/en${ROUTES.profileResearcherIdentity.path}`
      );
    });
  });
});
