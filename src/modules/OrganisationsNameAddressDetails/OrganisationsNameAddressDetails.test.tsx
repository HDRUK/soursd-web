import { mockedOrganisation } from "@/mocks/data/organisation";
import { formatAddress } from "../../utils/address";
import {
  commonAccessibilityTests,
  render,
  screen,
} from "../../utils/testUtils";
import OrganisationsNameAddressDetails from "./OrganisationsNameAddressDetails";

const organisation = mockedOrganisation({
  subsidiaries: [
    mockedOrganisation({
      name: "HDRUK",
    }),
  ],
});

const setupTest = () => {
  return render(
    <OrganisationsNameAddressDetails organisationData={organisation} />
  );
};

describe("<OrganisationsNameAddressDetails />", () => {
  it("renders all main fields with correct values", () => {
    setupTest();

    expect(screen.getByText(organisation.address_1)).toBeInTheDocument();
    expect(screen.getByText(organisation.address_1)).toBeInTheDocument();
    expect(screen.getByText(organisation.town)).toBeInTheDocument();
    expect(screen.getByText(organisation.country)).toBeInTheDocument();
    expect(screen.getByText(organisation.county)).toBeInTheDocument();
    expect(screen.getByText(organisation.postcode)).toBeInTheDocument();
  });

  it("renders the correct subsidiaries", () => {
    setupTest();

    expect(
      screen.getByText(organisation.subsidiaries[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatAddress(organisation.subsidiaries[0]))
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
