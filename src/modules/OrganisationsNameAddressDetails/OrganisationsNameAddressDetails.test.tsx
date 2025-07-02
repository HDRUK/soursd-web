import { mockedProjectDetails } from "@/mocks/data/project";
import { render, screen } from "@/utils/testUtils";
import OrganisationsNameAddressDetails from "./OrganisationsNameAddressDetails";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { formatAddress } from "@/utils/address";

const organisation = mockedOrganisation({
  subsidiaries: [
    mockedOrganisation({
      name: "HDRUK",
    }),
  ],
});

describe("<OrganisationsNameAddressDetails />", () => {
  it("renders all main fields with correct values", () => {
    render(<OrganisationsNameAddressDetails organisationData={organisation} />);

    expect(screen.getByText(organisation.address_1)).toBeInTheDocument();
    expect(screen.getByText(organisation.address_1)).toBeInTheDocument();
    expect(screen.getByText(organisation.town)).toBeInTheDocument();
    expect(screen.getByText(organisation.country)).toBeInTheDocument();
    expect(screen.getByText(organisation.county)).toBeInTheDocument();
    expect(screen.getByText(organisation.postcode)).toBeInTheDocument();
  });

  it("renders the correct subsidiaries", () => {
    render(<OrganisationsNameAddressDetails organisationData={organisation} />);

    expect(
      screen.getByText(organisation.subsidiaries[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatAddress(organisation.subsidiaries[0]))
    ).toBeInTheDocument();
  });
});
