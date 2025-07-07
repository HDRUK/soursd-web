import { mockedUser } from "@/mocks/data/user";
import { useTranslations } from "next-intl";
import {
  commonAccessibilityTests,
  render,
  screen,
} from "../../utils/testUtils";
import OrganisationsPeopleTable, {
  OrganisationsPeopleTableProps,
} from "./OrganisationsPeopleTable";

const user = mockedUser();

const TestComponent = (props?: Partial<OrganisationsPeopleTableProps>) => {
  const t = useTranslations("Organisations.People");

  return (
    <OrganisationsPeopleTable t={t} {...props} total={props?.data?.length} />
  );
};

const setupTest = (props?: Partial<OrganisationsPeopleTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<OrganisationsPeopleTable />", () => {
  it("renders warning message if no project details", () => {
    setupTest({
      data: [],
    });

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    setupTest({
      data: [user],
    });

    const {
      first_name,
      last_name,
      registry: { affiliations },
    } = user;

    expect(
      screen.getByText(new RegExp(`${first_name} ${last_name}`))
    ).toBeInTheDocument();
    expect(screen.getByText(affiliations[0].email)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`${affiliations[0].registryAffiliationState}`, "i")
      )
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
