import { ROUTES } from "@/consts/router";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import Completion from "./Completion";

describe("<Completion />", () => {
  beforeEach(() => {
    mockUseStore({
      config: {
        histories: {
          training: [],
        },
      },
    });
  });

  it("has the correct values", async () => {
    render(<Completion />);

    await waitFor(() => {
      expect(screen.getByText("Training")).toBeInTheDocument();
      expect(screen.getByText("50% complete")).toBeInTheDocument();
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
        ROUTES.profileResearcherIdentity.path
      );
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Completion />));
  });
});
