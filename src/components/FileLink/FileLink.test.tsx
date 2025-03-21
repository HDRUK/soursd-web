import {
  act,
  commonAccessibilityTests,
  fireEvent,
  userEvent,
  render,
  screen,
} from "@/utils/testUtils";
import FileLink, { FileLinkProps } from ".";

const mockOnFileChange = jest.fn();
const mockUploadClick = jest.fn();
const mockOnDownload = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => ({
    current: {
      click: mockUploadClick(),
    },
  }),
}));

const renderFileLinkTest = (props?: Partial<FileLinkProps>) => {
  return render(
    <FileLink
      message="test"
      fileButtonText="Upload"
      fileNameText="cv.pdf"
      fileScanOkText="Scan complete"
      fileScanErrorText="Scan failed"
      fileScanningText="File scanning"
      isSizeInvalid={false}
      isScanning={false}
      isScanComplete={false}
      isScanFailed={false}
      isUploading={false}
      includeStatus
      onDownload={mockOnDownload}
      onFileChange={mockOnFileChange}
      {...props}
    />
  );
};

describe("<FileLink />", () => {
  it("shows the correct filename", async () => {
    renderFileLinkTest();

    expect(screen.getByText("cv.pdf")).toBeInTheDocument();
  });

  it("calls file input", async () => {
    renderFileLinkTest();
    await act(() => {
      fireEvent.click(screen.getByTestId("upload-file"));
    });

    expect(mockUploadClick).toHaveBeenCalled();
  });

  it("uploads a file", async () => {
    renderFileLinkTest({
      fileInputLabelText: "CV file input",
    });

    await act(() => {
      fireEvent.change(screen.getByLabelText("CV file input"));
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("show the correct scan status", async () => {
    renderFileLinkTest({
      isScanning: true,
      includeStatus: true,
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows the failed virus state", async () => {
    renderFileLinkTest({
      isScanFailed: true,
    });

    const scanErrorIcon = screen.getByTestId("GppBadIcon");
    expect(scanErrorIcon).toBeInTheDocument();

    await userEvent.hover(scanErrorIcon);
    expect(await screen.findByText("Scan failed")).toBeInTheDocument();
  });

  it("shows the succeed virus state", async () => {
    renderFileLinkTest({
      isScanComplete: true,
    });

    const scanGoodIcon = screen.getByTestId("GppGoodIcon");
    expect(scanGoodIcon).toBeInTheDocument();

    await userEvent.hover(scanGoodIcon);
    expect(await screen.findByText("Scan complete")).toBeInTheDocument();
  });

  it("is not downloadable", async () => {
    renderFileLinkTest({
      onDownload: undefined,
    });

    const link = screen.getByTestId("download-file");

    fireEvent.click(link);

    expect(mockOnDownload).not.toHaveBeenCalled();
  });

  it("is downloadable", async () => {
    renderFileLinkTest();

    const link = screen.getByTestId("download-file");

    fireEvent.click(link);

    expect(mockOnDownload).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderFileLinkTest());
  });
});
