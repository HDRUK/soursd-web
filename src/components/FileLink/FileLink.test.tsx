import {
  act,
  commonAccessibilityTests,
  fireEvent,
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
      fileButtonText="Upload"
      fileHref="/"
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
      fireEvent.click(screen.getByRole("button"));
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

    expect(screen.getByTitle("Scan failed")).toBeInTheDocument();
  });

  it("shows the succeed virus state", async () => {
    renderFileLinkTest({
      isScanComplete: true,
    });

    expect(screen.getByTitle("Scan complete")).toBeInTheDocument();
  });

  it("is not downloadable", async () => {
    renderFileLinkTest({
      canDownload: false,
    });

    const link = screen.getByRole("link", {
      name: /cv.pdf/i,
    });

    fireEvent.click(link);

    expect(mockOnDownload).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderFileLinkTest());
  });
});
