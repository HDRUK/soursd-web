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

const renderCVDetails = (props?: Partial<CVDetailsProps>) => {
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
    const { container } = renderCVDetails();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("shows the correct filename", async () => {
    renderCVDetails({
      fileName: "sample.doc",
    });

    expect(screen.getByText("sample.doc")).toBeInTheDocument();
  });

  it("calls file input", async () => {
    renderCVDetails();

    await act(() => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(mockUploadClick).toHaveBeenCalled();
  });

  it("uploads a file", async () => {
    renderCVDetails();

    await act(() => {
      fireEvent.change(screen.getByLabelText("CV file input"));
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("show a loader", async () => {
    renderCVDetails({
      mutateState: {
        isLoading: true,
        isError: false,
      },
    });

    expect(screen.getByTestId("UploadLink-loader")).toBeInTheDocument();
  });
});
