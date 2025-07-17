import { mockedSubsidiary } from "@/mocks/data/organisation";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { formatAddress } from "@/utils/address";
import { useTranslations } from "next-intl";
import OrganisationsSubsidiariesTable, {
  OrganisationsSubsidiariesTableProps,
} from "./OrganisationsSubsidiariesTable";

const subsidiary = mockedSubsidiary();

const TestComponent = (
  props?: Partial<OrganisationsSubsidiariesTableProps>
) => {
  const t = useTranslations("Organisations.Subsidiaries");

  return (
    <OrganisationsSubsidiariesTable
      data={[subsidiary]}
      isPaginated={false}
      t={t}
      {...props}
    />
  );
};

const setupTest = (props?: Partial<OrganisationsSubsidiariesTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<OrganisationsSubsidiariesTable />", () => {
  it("renders warning message if no project details", () => {
    setupTest({
      data: [],
    });

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    setupTest();

    expect(screen.getByText(subsidiary.name)).toBeInTheDocument();
    expect(screen.getByText(formatAddress(subsidiary))).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
