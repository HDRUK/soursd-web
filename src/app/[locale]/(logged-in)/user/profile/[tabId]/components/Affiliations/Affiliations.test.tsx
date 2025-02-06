import {
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/testUtils";
import { useRouter } from "next/navigation";
import Affiliations from "./Affiliations";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
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
