import { mockedCharity } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import CharitiesTable from "./CharitiesTable";

const charity = mockedCharity({
  name: faker.company.name(),
  registration_id: faker.string.sample(),
  website: faker.internet.url(),
});

describe("<CharitiesTable />", () => {
  it("renders warning message if no project details", () => {
    render(<CharitiesTable charitiesData={[]} />);

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    render(<CharitiesTable charitiesData={[charity]} />);

    expect(screen.getByText(charity.registration_id)).toBeInTheDocument();
    expect(screen.getByText(charity.name)).toBeInTheDocument();
    expect(screen.getByText(charity.website)).toBeInTheDocument();
  });
});
