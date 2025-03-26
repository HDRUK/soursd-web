import { render, screen, waitFor } from "@/utils/testUtils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mockedCustodian } from "@/mocks/data/custodian";
import { mockUseStore } from "jest.setup";
import ProjectsSafeData from "./ProjectsSafeData";
import { mockedProject, mockedProjectDetails } from "@/mocks/data/project";

jest.mock("@tanstack/react-query");
jest.mock("@/data/store", () => ({
  useStore: jest.fn(() => ({})),
}));
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("<ProjectsSafeData />", () => {
  const mockId = 1;

  beforeEach(() => {
    mockUseStore({
      custodian: mockedCustodian({
        id: 1,
      }),
    });
  });

  const mockProjectData = mockedProject({ unique_id: "PROJ-001" });
  const mockProjectDetailsData = mockedProjectDetails();

  beforeEach(() => {
    (useQuery as jest.Mock).mockImplementation((queryKey) => {
      if (queryKey.queryKey?.[0] === "getProjectDetailsByProjectId") {
        return {
          data: { data: mockProjectDetailsData },
          refetch: jest.fn(),
          isLoading: false,
        };
      }
      if (queryKey.queryKey?.[0] === "getProject") {
        return {
          data: { data: mockProjectData },
          isLoading: false,
        };
      }
      return {};
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
      isError: false,
    });
  });

  it("renders the ProjectsSafeData component", async () => {
    render(<ProjectsSafeData id={mockId} />);

    await waitFor(() => {
      expect(screen.getByText(/safeData/i)).toBeInTheDocument();
    });
  });

  it("displays form fields with correct default values", async () => {
    render(<ProjectsSafeData id={mockId} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/datasetName/i)).toHaveValue("dataset1");
      expect(screen.getByLabelText(/dataSensitivityLevel/i)).toHaveValue("Protected Data");
      expect(screen.getByLabelText(/lawfulCondition/i)).toHaveValue("Legal Basis");
      expect(screen.getByLabelText(/lawfulBasisConfirmation/i)).toBeChecked();
      expect(screen.getByLabelText(/nationalDataOptOut/i)).not.toBeChecked();
      expect(screen.getByLabelText(/oneOffRequest/i)).toBeChecked();
      expect(screen.getByLabelText(/linkedDatasets/i)).toHaveValue("Linkage Description");
      expect(screen.getByLabelText(/dataMinimisation/i)).toHaveValue("Data Minimisation");
      expect(screen.getByLabelText(/dataDescription/i)).toHaveValue("Data Use Description");
      expect(screen.getByLabelText(/releaseDate/i)).toHaveValue("2023-01-01");
    });
  });

  it("handles form submission", async () => {
    const mockPutProjectDetails = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockPutProjectDetails,
      isPending: false,
      isError: false,
    });

    render(<ProjectsSafeData id={mockId} />);

    await waitFor(() => {
      screen.getByRole("button", { name: /save/i }).click();
    });

    expect(mockPutProjectDetails).toHaveBeenCalled();
  });

  it("handles loading state", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { container } = render(<ProjectsSafeData id={mockId} />);

    await waitFor(() => {
      expect(container.querySelectorAll(".MuiSkeleton-root").length).toBeGreaterThan(0);
    });
  });

  it("handles import from gateway", async () => {
    const mockGetGatewayData = jest.fn().mockResolvedValue({
      data: {
        datasets: JSON.stringify(["Imported Dataset"]),
        data_sensitivity_level: "Restricted Data",
      },
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockGetGatewayData,
      isPending: false,
      isError: false,
    });

    render(<ProjectsSafeData id={mockId} />);

    await waitFor(() => {
      screen.getByRole("button", { name: /importFromHealthDataResearchGateway/i }).click();
    });

    expect(mockGetGatewayData).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByLabelText(/datasetName/i)).toHaveValue("Imported Dataset");
      expect(screen.getByLabelText(/dataSensitivityLevel/i)).toHaveValue("Restricted Data");
    });
  });
});