import { mockedSubsidiary } from "@/mocks/data/organisation";
import {
  commonAccessibilityTests,
  render,
  screen,
} from "../../utils/testUtils";
import { formatAddress } from "../../utils/address";
import SubsidiariesTable from "./SubsidiariesTable";

const subsidiary = mockedSubsidiary();

const setupTest = (props?: Partial<SubsidiariesTableProps>) => {
  return render(<SubsidiariesTable subsidiariesData={[]} {...props} />);
};

describe("<SubsidiariesTable />", () => {
  it("renders warning message if no project details", () => {
    setupTest();

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    setupTest({
      subsidiariesData: [subsidiary],
    });

    expect(screen.getByText(subsidiary.name)).toBeInTheDocument();
    expect(screen.getByText(formatAddress(subsidiary))).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
