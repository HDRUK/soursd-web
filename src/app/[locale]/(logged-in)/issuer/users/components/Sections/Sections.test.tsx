import { ROUTES } from "@/consts/router";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Sections from ".";

const mockMutate = jest.fn();

jest.mock("../../hooks/useMutationApproval", () => ({
  ...jest.requireActual("../../hooks/useMutationApproval"),
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutateAsync: (props: PostApprovalPayloadWithEntity) => mockMutate(props),
    isError: false,
    isLoading: false,
    error: "",
  }),
}));

const renderSections = () => render(<Sections />);

const setupActionMenuTest = async (label: string, menuItem: string) => {
  renderSections();

  const menu = await screen.findAllByLabelText(label);
  const menuTrigger = menu[0].childNodes[0];

  fireEvent.click(menuTrigger);

  return screen.findByText(menuItem);
};

describe("<Sections />", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

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
    const permissions = await setupActionMenuTest(
      "Organisation 1 actions",
      "Permissions"
    );

    await waitFor(() => {
      expect(permissions).toHaveAttribute(
        "href",
        `/en${ROUTES.permissionsOrganisationIssuer.path}/1`
      );
    });
  });

  it("has the researcher permissions link", async () => {
    const permissions = await setupActionMenuTest(
      "john.smith@hdruk.ac.uk actions",
      "Permissions"
    );

    await waitFor(() => {
      expect(permissions).toHaveAttribute(
        "href",
        `/en${ROUTES.permissionsResearcherIssuer.path}/1`
      );
    });
  });

  it("approves a researcher", async () => {
    const approval = await setupActionMenuTest(
      "john.smith@hdruk.ac.uk actions",
      "Approve"
    );

    fireEvent.click(approval);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        type: EntityType.RESEARCHER,
        user_id: 1,
        issuer_id: 1,
      });
    });
  });

  it("approves an organisation", async () => {
    const approval = await setupActionMenuTest(
      "Organisation 1 actions",
      "Approve"
    );

    fireEvent.click(approval);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        type: EntityType.ORGANISATION,
        organisation_id: 1,
        issuer_id: 1,
      });
    });
  });
});
