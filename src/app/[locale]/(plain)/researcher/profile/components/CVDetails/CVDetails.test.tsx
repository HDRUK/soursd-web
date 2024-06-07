import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import CVDetails from ".";
import { CVDetailsProps } from "./CVDetails";

const mockOnFileChange = jest.fn();
const mockUploadClick = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => ({
    current: {
      click: mockUploadClick(),
    },
  }),
}));

const renderLoginForm = (props?: Partial<CVDetailsProps>) => {
  return render(
    <CVDetails
      mutateState={{ isLoading: false, isError: false }}
      onFileChange={mockOnFileChange}
      {...props}
    />
  );
};

describe("<CVDetails />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderLoginForm();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("shows the correct filename", async () => {
    renderLoginForm({
      fileName: "sample.doc",
    });

    expect(screen.getByText("sample.doc")).toBeInTheDocument();
  });

  it("calls file input", async () => {
    renderLoginForm();

    await act(() => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(mockUploadClick).toHaveBeenCalled();
  });

  it("uploads a file", async () => {
    renderLoginForm();

    await act(() => {
      fireEvent.change(screen.getByLabelText("CV file input"));
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("show a loader", async () => {
    renderLoginForm({
      mutateState: {
        isLoading: true,
        isError: false,
      },
    });

    expect(screen.getByTestId("UploadLink-loader")).toBeInTheDocument();
  });
});
