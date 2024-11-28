import { mockedOrganisation } from "@/mocks/data/organisation";
import { act, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Users from ".";

const mockedStoreOrganisation = mockedOrganisation();

jest.mock("@/data/store", () => ({
  useStore: () => mockedStoreOrganisation,
}));

const renderSections = () => render(<Users />);

describe("<Users />", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderSections();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("displays the correct user", () => {
    renderSections();

    const { user } = mockedStoreOrganisation.registries[0];

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.first_name)).toBeInTheDocument();
    expect(screen.getByText(user.last_name)).toBeInTheDocument();
  });
});
