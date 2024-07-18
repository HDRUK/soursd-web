import { ROUTES } from "@/consts/router";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Sections from ".";

const renderSections = () => render(<Sections />);

const setupActionMenuPermissionsTest = async (label: string) => {
  renderSections();

  const menu = await screen.findAllByLabelText(label);
  const menuTrigger = menu[0].childNodes[0];

  fireEvent.click(menuTrigger);

  return screen.getByText("Permissions");
};

describe("<Sections />", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderSections();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("displays the correct organisations", async () => {
    renderSections();

    await waitFor(() => {
      expect(screen.getByText("Organisation 1")).toBeInTheDocument();
      expect(screen.getByText("Organisation 2")).toBeInTheDocument();
    });
  });

  it("displays the correct researchers", async () => {
    renderSections();

    await waitFor(() => {
      expect(
        screen.getAllByText("john.smith@hdruk.ac.uk")[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText("jane.doe@hdruk.ac.uk")[0]
      ).toBeInTheDocument();
    });
  });

  it("has the organisations permissions link", async () => {
    const permissions = await setupActionMenuPermissionsTest(
      "Organisation 1 actions"
    );

    await waitFor(() => {
      expect(permissions).toHaveAttribute(
        "href",
        `/en${ROUTES.permissionsOrganisationIssuer.path}/1`
      );
    });
  });

  it("has the researcher permissions link", async () => {
    const permissions = await setupActionMenuPermissionsTest(
      "john.smith@hdruk.ac.uk actions"
    );

    await waitFor(() => {
      expect(permissions).toHaveAttribute(
        "href",
        `/en${ROUTES.permissionsResearcherIssuer.path}/1`
      );
    });
  });
});
