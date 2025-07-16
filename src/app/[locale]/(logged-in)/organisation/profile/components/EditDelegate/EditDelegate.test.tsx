import { mockedUser } from "@/mocks/data/user";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import EditDelegate, { EditDelegateProps } from "./EditDelegate";

const mockMutateAsync = jest.fn().mockResolvedValue(null);

jest.mock("@/hooks/useQueryAlerts");

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation(() => ({
    mutateAsync: payload => mockMutateAsync(payload),
    isLoading: false,
    isError: false,
    isSuccess: true,
  })),
}));

const defaultProps = {
  user: mockedUser(),
  onSuccess: jest.fn(),
};

function setupTest(props?: EditDelegateProps) {
  const rendered = render(<EditDelegate {...defaultProps} {...props} />);

  const title = screen.getByText("Edit");
  fireEvent.click(title);

  return rendered;
}

async function setupSubmitFormTest(props?: EditDelegateProps) {
  const rendered = render(<EditDelegate {...defaultProps} {...props} />);

  const title = screen.getByText("Edit");
  fireEvent.click(title);

  const form = await screen.findByRole("form", {
    name: "Edit delegate",
  });
  fireEvent.submit(form);

  return rendered;
}

function getAllInputs() {
  return [/First name/, /Last name/, /Select department/];
}

describe("<EditDelegate />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getAllByLabelText(selector)[0]).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupSubmitFormTest();

    const { first_name, last_name, departments } = defaultProps.user;

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        first_name,
        last_name,
        department_id: departments?.[0].id,
      });
    });
  });

  it("uses useQueryAlert", async () => {
    setupSubmitFormTest();

    await waitFor(() => {
      expect(useQueryAlerts).toHaveBeenLastCalledWith(
        { isError: false, isLoading: false, isSuccess: true },
        {
          errorAlertProps: {
            text: expect.any(Object),
          },
          onSuccess: expect.any(Function),
          successAlertProps: {
            text: expect.any(String),
          },
        }
      );
    });
  });

  it("does not submit the form when a value is cleared", async () => {
    setupTest();

    const departmentId = screen
      .getByTestId("department_id")
      .querySelector("input");

    fireEvent.change(departmentId, { target: { value: "" } });

    const form = await screen.findByRole("form", {
      name: "Edit delegate",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });
});
