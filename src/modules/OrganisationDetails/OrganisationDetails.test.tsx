import { mockedOrganisation } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import OrganisationDetails, {
  OrganisationDetailsProps,
} from "./OrganisationDetails";

const organisation = mockedOrganisation();

const defaultProps = {
  data: organisation,
  isApproved: true,
};

const setupTest = (props?: OrganisationDetailsProps) => {
  return render(<OrganisationDetails {...defaultProps} {...props} />);
};

describe("<OrganisationsDigitalIdentifiersDetails />", () => {
  it("renders all main fields with correct values", () => {
    setupTest();

    expect(
      screen.getByText(new RegExp(`CRN: ${organisation.companies_house_no}`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(organisation.organisation_name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(organisation.lead_applicant_email)
    ).toBeInTheDocument();
    expect(screen.getByText(organisation.address_1)).toBeInTheDocument();
    expect(screen.getByText(organisation.address_2)).toBeInTheDocument();
    expect(screen.getByText(organisation.town)).toBeInTheDocument();
    expect(screen.getByText(organisation.county)).toBeInTheDocument();
    expect(screen.getByText(organisation.country)).toBeInTheDocument();
    expect(screen.getByText(organisation.postcode)).toBeInTheDocument();
    expect(screen.getByTitle("Approved")).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    setupTest({
      isApproved: false,
    });

    expect(screen.getByTitle("Not approved")).toBeInTheDocument();
  });
});
