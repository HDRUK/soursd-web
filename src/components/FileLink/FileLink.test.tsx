import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import FileLink, { FileLinkProps } from ".";

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

const renderFileLinkDetails = (props?: Partial<FileLinkProps>) => {
  return render(
    <FileLink
      maxSizeLabel="10mb (max)"
      onFileChange={mockOnFileChange}
      iconButtonProps={{
        "aria-label": "Icon button",
      }}
      {...props}
    />
  );
};

describe("<FileLink />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderFileLinkDetails();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("shows the correct filename", async () => {
    renderFileLinkDetails({
      fileName: "sample.doc",
    });

    expect(screen.getByText("sample.doc")).toBeInTheDocument();
  });

  it("calls file input", async () => {
    renderFileLinkDetails();

    await act(() => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(mockUploadClick).toHaveBeenCalled();
  });

  it("uploads a file", async () => {
    renderFileLinkDetails({
      inputProps: {
        "aria-label": "CV file input",
      },
    });

    await act(() => {
      fireEvent.change(screen.getByLabelText("CV file input"));
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("show a loader", async () => {
    renderFileLinkDetails({
      isLoading: true,
    });

    expect(screen.getByTestId("UploadLink-loader")).toBeInTheDocument();
  });
});
