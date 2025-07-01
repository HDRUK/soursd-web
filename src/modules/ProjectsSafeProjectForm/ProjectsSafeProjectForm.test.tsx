import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { Status } from "../../components/ChipStatus";
import ProjectsSafeProjectForm, {
  ProjectsSafeProjectFormProps,
} from "./ProjectsSafeProjectForm";

const defaultProps: ProjectsSafeProjectFormProps = {
  mutateState: { isPending: false, isError: false, isSuccess: false },
  project: {
    unique_id: "123",
    title: "Test Project",
    request_category_type: "type",
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    lay_summary: "summary",
    public_benefit: "benefit",
    technical_summary: "tech",
    status: Status.PROJECT_APPROVED,
    other_approval_committees: [],
  },
  onSubmit: jest.fn(),
  defaultValues: {
    unique_id: "123",
    title: "Test Project",
    request_category_type: "type",
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    lay_summary: "summary",
    public_benefit: "benefit",
    technical_summary: "tech",
    status: Status.PROJECT_APPROVED,
    other_approval_committees: [],
  },
};

function setupTest(props?: Partial<ProjectsSafeProjectFormProps>) {
  return render(<ProjectsSafeProjectForm {...defaultProps} {...props} />);
}

function getAllInputs() {
  return [
    /ID/,
    /Project name/,
    /Category/,
    "start_date",
    "end_date",
    /Lay summary/,
    /Public benefit statement/,
    /Technical summary/,
    /Approved/,
    /Pending/,
    /Completed/,
  ];
}

describe("<ProjectsSafeProjectForm />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      if (typeof selector === "string") {
        expect(screen.getByTestId(selector)).toBeInTheDocument();
      } else {
        expect(screen.getByLabelText(selector)).toBeInTheDocument();
      }
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Safe project" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(
        defaultProps.defaultValues
      );
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    const inputs = getAllInputs();

    clearInputsByLabelText(inputs.filter(input => typeof input !== "string"));

    const form = await screen.findByRole("form", { name: "Safe project" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
