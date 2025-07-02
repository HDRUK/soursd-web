import { mockedCharity, mockedSubsidiary } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import SubsidiariesTable from "./SubsidiariesTable";
import { faker } from "@faker-js/faker";
import { formatAddress } from "@/utils/address";

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
