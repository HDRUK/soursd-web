import { mockedOrganisation } from "@/mocks/data/organisation";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import OrganisationsSectorWebsiteDetails, {
  OrganisationsSectorWebsiteDetailsProps,
} from "./OrganisationsSectorWebsiteDetails";

const organisation = mockedOrganisation();

const defaultProps = {
  organisationData: organisation,
};

const setupTest = (props?: OrganisationsSectorWebsiteDetailsProps) => {
  return render(
    <OrganisationsSectorWebsiteDetails {...defaultProps} {...props} />
  );
};

describe("<OrganisationsSectorWebsiteDetails />", () => {
  it("renders all main fields with correct values", () => {
    setupTest();

    expect(
      screen.getByText(organisation.organisation_size)
    ).toBeInTheDocument();
    expect(screen.getByText(organisation.website)).toBeInTheDocument();
    expect(screen.getByText(organisation.sector.name)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
