import { render, screen, fireEvent } from "@/utils/testUtils";
import { mockedProjectDetails } from "@/mocks/data/project";
import ProjectImport, { ProjectImportProps } from "./ProjectImport";

const mockImportProps = jest.fn(() => ({
  handleImportData: jest.fn(),
  data: undefined,
}));

jest.mock("@/hooks/useGatewayProjectImport", () => {
  return () => mockImportProps();
});

const project = mockedProjectDetails();

const defaultProps = {
  custodianId: 1,
  projectId: 2,
  isImportDisabled: false,
  onImported: jest.fn(),
};

const setupTest = (props?: Partial<ProjectImportProps>) => {
  return render(<ProjectImport {...defaultProps} {...props} />);
};

const setupImportTest = (props?: Partial<ProjectImportProps>) => {
  mockImportProps.mockReturnValue({
    data: { data: project },
    handleImportData: jest.fn(),
  });

  const rendered = setupTest(props);

  fireEvent.click(
    screen.getByRole("button", {
      name: "Import from the Health Data Research Gateway",
    })
  );

  return rendered;
};

describe("<ProjectImport />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the import button with correct label", () => {
    setupTest();

    expect(
      screen.getByRole("button", {
        name: "Import from the Health Data Research Gateway",
      })
    ).toBeInTheDocument();
  });

  it("calls handleImportData with correct params when clicked", () => {
    setupImportTest();

    expect(defaultProps.onImported).toHaveBeenCalledWith(project);
  });

  it("disables the button when isImportDisabled is true", () => {
    setupImportTest({
      isImportDisabled: true,
    });

    expect(
      screen.getByRole("button", {
        name: "Import from the Health Data Research Gateway",
      })
    ).toBeDisabled();
  });
});
