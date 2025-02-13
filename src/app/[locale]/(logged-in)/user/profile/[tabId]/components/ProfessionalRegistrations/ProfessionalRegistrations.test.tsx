import {
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/testUtils";
import { useRouter } from "next/navigation";
import ProfessionalRegistrations from "./ProfessionalRegistrations";

const mockPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

const renderProfessionalRegistrationsComponent = () => {
  return render(<ProfessionalRegistrations />);
};

describe("<ProfessionalRegistrations />", () => {
  it("has the correct content", async () => {
    renderProfessionalRegistrationsComponent();

    await waitFor(() => {
      expect(screen.getByText(/Name 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/A1234567/i)).toBeInTheDocument();
  });

  it("navigates when the continue button is clicked", async () => {
    renderProfessionalRegistrationsComponent();

    const button = screen.getByText("Continue");
    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/user/profile/training");
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProfessionalRegistrationsComponent());
  });
});
