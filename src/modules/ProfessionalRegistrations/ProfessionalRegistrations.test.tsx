import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
  within,
} from "@/utils/testUtils";
import { EntityType } from "@/types/api";
import ProfessionalRegistrations from "./ProfessionalRegistrations";

const renderProfessionalRegistrationsComponent = () => {
  return render(<ProfessionalRegistrations variant={EntityType.CUSTODIAN} />);
};

describe("<ProfessionalRegistrations />", () => {
  it("has the correct content", async () => {
    renderProfessionalRegistrationsComponent();

    const table = await screen.findByRole("table");
    const tbody = table.querySelector("tbody");

    if (tbody) {
      const rows = within(tbody).getAllByRole("row");

      await waitFor(() => {
        expect(rows).toHaveLength(1);
      });
    } else {
      fail("Could not find table body");
    }
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProfessionalRegistrationsComponent());
  });
});
