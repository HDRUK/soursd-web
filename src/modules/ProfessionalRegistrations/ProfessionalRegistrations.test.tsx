import { mockedProfessionalRegistration, mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
  within,
} from "../../utils/testUtils";
import { EntityType } from "../../types/api";
import ProfessionalRegistrations from "./ProfessionalRegistrations";

const renderProfessionalRegistrationsComponent = () => {
  const user = mockedUser();
  const professionalRegistrations = [
    mockedProfessionalRegistration({ id: 1 }),
    mockedProfessionalRegistration({ id: 2 }),
  ];

  return render(
    <ProfessionalRegistrations
      variant={EntityType.CUSTODIAN}
      user={user}
      setHistories={undefined}
      getHistories={undefined}
      professionalRegistrations={professionalRegistrations}
    />
  );
};

describe("<ProfessionalRegistrations />", () => {
  it("has the correct content", async () => {
    renderProfessionalRegistrationsComponent();

    const table = await screen.findByRole("table");
    const tbody = table.querySelector("tbody");

    if (tbody) {
      const rows = within(tbody).getAllByRole("row");

      await waitFor(() => {
        expect(rows).toHaveLength(2);
      });
    } else {
      fail("Could not find table body");
    }
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProfessionalRegistrationsComponent());
  });
});
