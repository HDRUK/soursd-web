import { mockedCharity } from "@/mocks/data/organisation";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import CharitiesTable, { CharitiesTableProps } from "./CharitiesTable";

const charity = mockedCharity({
  name: faker.company.name(),
  registration_id: faker.string.sample(),
  website: faker.internet.url(),
});

const setupTest = (props?: Partial<CharitiesTableProps>) => {
  return render(<CharitiesTable charitiesData={[]} {...props} />);
};

describe("<CharitiesTable />", () => {
  it("renders warning message if no project details", () => {
    setupTest();

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    setupTest({
      charitiesData: [charity],
    });

    expect(screen.getByText(charity.registration_id)).toBeInTheDocument();
    expect(screen.getByText(charity.name)).toBeInTheDocument();
    expect(screen.getByText(charity.website)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
