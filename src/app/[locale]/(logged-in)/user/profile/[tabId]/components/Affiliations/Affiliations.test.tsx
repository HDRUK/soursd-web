import { useStore } from "@/data/store";
import { mockedAffiliation, mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/testUtils";
import { useRouter } from "next/navigation";
import Affiliations from "./Affiliations";

jest.mock("@/data/store");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

const defaultUser = mockedUser({
  registry_id: 1,
});
const defaultAffiliations = [
  mockedAffiliation({
    current_employer: false,
    id: 1,
    member_id: "A1234567",
    organisation: {
      organisation_name: "Organisation 1",
    },
  }),
];

(useStore as unknown as jest.Mock).mockReturnValue({
  user: defaultUser,
  affiliations: defaultAffiliations,
  getHistories: jest.fn(),
  setHistories: jest.fn(),
});

const renderAffiliationsComponent = () => {
  return render(<Affiliations />);
};

describe("<Affiliations />", () => {
  it("has the correct content", async () => {
    renderAffiliationsComponent();
    await waitFor(() => {
      expect(screen.getByText(/Organisation 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Previous employer/i)).toBeInTheDocument();
    expect(screen.getByText(/A1234567/i)).toBeInTheDocument();
  });

  it("navigates when the continue button is clicked", async () => {
    renderAffiliationsComponent();
    const button = screen.getByText("Continue");
    await userEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/user/profile/experience");
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderAffiliationsComponent());
  });
});
