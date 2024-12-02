import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { act, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
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
  it("has no accessibility validations", async () => {
    const { container } = render(<Completion />);

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("has the correct values", async () => {
    render(<Completion />);

    await waitFor(() => {
      expect(screen.getByText("Identity")).toBeInTheDocument();
      expect(screen.getByText("67% complete")).toBeInTheDocument();
    });
  });

  it("has the correct values", async () => {
    render(<Completion />);

    const link = screen.getByRole("link", {
      name: "Continue",
    });

    await waitFor(() => {
      expect(link).toHaveAttribute(
        "href",
        `/en${ROUTES.profileResearcherIdentity.path}`
      );
    });
  });
});
