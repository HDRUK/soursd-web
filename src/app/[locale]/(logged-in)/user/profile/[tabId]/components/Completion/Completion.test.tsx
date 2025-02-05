import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import {
  mockedAccreditation,
  mockedAffiliation,
  mockedEducation,
  mockedEmployment,
  mockedUser,
} from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import Completion from "./Completion";

jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue([
  mockedUser(),
  {
    accreditations: [mockedAccreditation()],
    education: [mockedEducation()],
    employments: [mockedEmployment()],
    affiliations: [mockedAffiliation()],
    training: [],
    identity: mockedUser(),
  },
]);

describe("<Completion />", () => {
  it("has the correct values", async () => {
    render(<Completion />);

    await waitFor(() => {
      expect(screen.getByText("Training")).toBeInTheDocument();
      expect(screen.getByText("0% complete")).toBeInTheDocument();
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
