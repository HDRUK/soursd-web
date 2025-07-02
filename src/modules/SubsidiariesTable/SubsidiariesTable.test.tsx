import { mockedSubsidiary } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import { formatAddress } from "@/utils/address";
import SubsidiariesTable from "./SubsidiariesTable";

const subsidiary = mockedSubsidiary();

describe("<CharitiesTable />", () => {
  it("renders warning message if no project details", () => {
    render(<SubsidiariesTable subsidiariesData={[]} />);

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    render(<SubsidiariesTable subsidiariesData={[subsidiary]} />);

    expect(screen.getByText(subsidiary.name)).toBeInTheDocument();
    expect(screen.getByText(formatAddress(subsidiary))).toBeInTheDocument();
  });
});
