import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { mockedOrganisation } from "@/mocks/data/organisation";
import OrganisationsNameAddressDetails from "./OrganisationsNameAddressDetails";

const organisation = mockedOrganisation();

const setupTest = () => {
  return render(
    <OrganisationsNameAddressDetails organisationData={organisation} />
  );
};

describe("<OrganisationsNameAddressDetails />", () => {
  it("renders all main fields with correct values", () => {
    setupTest();

    expect(screen.getByText(organisation.address_1)).toBeInTheDocument();
    expect(screen.getByText(organisation.address_2)).toBeInTheDocument();
    expect(screen.getByText(organisation.town)).toBeInTheDocument();
    expect(screen.getByText(organisation.country)).toBeInTheDocument();
    expect(screen.getByText(organisation.county)).toBeInTheDocument();
    expect(screen.getByText(organisation.postcode)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
