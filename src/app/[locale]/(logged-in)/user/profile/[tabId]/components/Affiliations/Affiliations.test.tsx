import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { useRouter } from "next/navigation";
import Affiliations from "./Affiliations";

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

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderAffiliationsComponent());
  });
});
