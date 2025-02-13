import {
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
  within,
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

    const tbody = screen.getByRole("table").querySelector("tbody");

    if (tbody) {
      const rows = within(tbody).getAllByRole("row");

      await waitFor(() => {
        expect(rows).toHaveLength(2);
      });

      expect(screen.getByText(/ONS/i)).toBeInTheDocument();
      expect(screen.getByText(/A1234567/i)).toBeInTheDocument();

      expect(screen.getByText(/HDR/i)).toBeInTheDocument();
      expect(screen.getByText(/B2345678/i)).toBeInTheDocument();
    } else {
      fail("Could not find table body");
    }
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProfessionalRegistrationsComponent());
  });
});
