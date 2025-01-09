import { useStore } from "@/data/store";
import { act, fireEvent, render, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { mockedCustodian } from "@/mocks/data/custodian";
import { mockedOrganisation } from "@/mocks/data/organisation";
import AppRouterContextProviderMock from "@/mocks/context/router";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import Projects from ".";

jest.mock("@/data/store");

const mockedPush = jest.fn();

const defaultOrganisation = mockedOrganisation({ id: 1 });
const defaultCustodian = mockedCustodian({ id: 1 });

(useStore as unknown as jest.Mock).mockImplementation(() => ({
  getOrganisation: () => defaultOrganisation,
  getCustodian: () => defaultCustodian,
}));

const renderProjects = ({ variant }: { variant: ProjectEntities }) =>
  render(
    <AppRouterContextProviderMock router={{ push: mockedPush }}>
      <Projects variant={variant} />
    </AppRouterContextProviderMock>
  );

describe("Organisation Projects", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderProjects({ variant: "organisation" });

    let results;

    await act(async () => {
      results = await axe(container);
    });
    expect(results).toHaveNoViolations();
  });
  it("display 10 projects", async () => {
    const { getAllByTestId } = renderProjects({
      variant: "organisation",
    });
    await waitFor(() => {
      const accordions = getAllByTestId(/^project-accordion-/);
      expect(accordions.length).toBe(10);
    });

    const expandIcons = getAllByTestId("ExpandMoreIcon");
    const expandIcon = expandIcons[0];
    fireEvent.click(expandIcon!);
  });
});

describe("Custodian Projects", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderProjects({ variant: "custodian" });

    let results;

    await act(async () => {
      results = await axe(container);
    });
    expect(results).toHaveNoViolations();
  });
  it("display 5 projects", async () => {
    const { getAllByTestId } = renderProjects({
      variant: "custodian",
    });
    await waitFor(() => {
      const accordions = getAllByTestId(/^project-accordion-/);
      expect(accordions.length).toBe(5);
    });

    const expandIcons = getAllByTestId("ExpandMoreIcon");
    const expandIcon = expandIcons[0];
    fireEvent.click(expandIcon!);
  });
});
