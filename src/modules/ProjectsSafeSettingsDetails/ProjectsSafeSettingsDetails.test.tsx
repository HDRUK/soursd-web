import { mockedProjectDetails } from "@/mocks/data/project";
import { render, screen } from "@/utils/testUtils";
import ProjectsSafeSettingsDetails from "./ProjectsSafeSettingsDetails";

const projectDetailsData = mockedProjectDetails({
  access_type: "SDE",
  data_privacy: "Data privacy description",
});

describe("<ProjectsSafeSettingsDetails />", () => {
  it("renders warning message if no project details", () => {
    render(<ProjectsSafeSettingsDetails projectDetailsData={null} />);

    expect(
      screen.getByText(/Data does not exist for this section yet/i)
    ).toBeInTheDocument();
  });

  it("renders all main fields with correct values", () => {
    render(
      <ProjectsSafeSettingsDetails projectDetailsData={projectDetailsData} />
    );

    expect(screen.getByText("SDE")).toBeInTheDocument();
    expect(screen.getByText("Data privacy description")).toBeInTheDocument();
  });
});
