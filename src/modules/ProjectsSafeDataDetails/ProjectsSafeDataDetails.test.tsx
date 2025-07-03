import { mockedProjectDetails } from "@/mocks/data/project";
import { render, screen } from "@/utils/testUtils";
import ProjectsSafeDataDetails from "./ProjectsSafeDataDetails";

const projectDetailsData = mockedProjectDetails();
describe("<ProjectsSafeDataDetails />", () => {
  it("renders warning message if no project details", () => {
    render(<ProjectsSafeDataDetails projectDetailsData={null} />);

    expect(
      screen.getByText(/Data does not exist for this section yet/i)
    ).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    render(<ProjectsSafeDataDetails projectDetailsData={projectDetailsData} />);

    expect(
      screen.getByText(projectDetailsData.data_sensitivity_level)
    ).toBeInTheDocument();
    expect(
      screen.getByText(projectDetailsData.legal_basis_for_data_article6)
    ).toBeInTheDocument();
    expect(
      screen.getByText(projectDetailsData.data_minimisation)
    ).toBeInTheDocument();
    expect(
      screen.getByText(projectDetailsData.data_use_description)
    ).toBeInTheDocument();
    expect(
      screen.getByText(projectDetailsData.dataset_linkage_description)
    ).toBeInTheDocument();
    expect(
      screen.getByText(projectDetailsData.request_frequency)
    ).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("ONE-OFF")).toBeInTheDocument();
  });
});
