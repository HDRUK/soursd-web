import React from "react";
import {
  render,
  screen,
  userEvent,
  fireEvent,
  commonAccessibilityTests,
} from "../../utils/testUtils";
import CertificateUploadModal from "./CertificateUploadModal";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("<CertificateUploadModal />", () => {
  const mockOnClose = jest.fn();
  const mockOnUpload = jest.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onUpload: mockOnUpload,
    isScanning: false,
    isScanComplete: false,
    isScanFailed: false,
    isUploading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    render(<CertificateUploadModal {...defaultProps} />);
    expect(screen.getByText("trainingCertificateUpload")).toBeInTheDocument();
    expect(screen.getByText("uploadInstructions")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "fileUpload" })
    ).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<CertificateUploadModal {...defaultProps} open={false} />);
    expect(
      screen.queryByText("trainingCertificateUpload")
    ).not.toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(<CertificateUploadModal {...defaultProps} />);
    fireEvent.click(screen.getByText("cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when done button is clicked", () => {
    render(<CertificateUploadModal {...defaultProps} />);
    fireEvent.click(screen.getByText("done"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("displays file name when file is provided", () => {
    const file = { name: "test-file.pdf" };
    render(<CertificateUploadModal {...defaultProps} file={file} />);
    expect(screen.getByText("test-file.pdf")).toBeInTheDocument();
  });

  it('displays "No files uploaded" when no file is provided', () => {
    render(<CertificateUploadModal {...defaultProps} />);
    expect(screen.getByText("noFilesUploaded")).toBeInTheDocument();
  });

  it("displays scan failed status correctly", async () => {
    render(<CertificateUploadModal {...defaultProps} isScanFailed />);
    const scanErrorIcon = screen.getByTestId("GppBadIcon");
    expect(scanErrorIcon).toBeInTheDocument();

    await userEvent.hover(scanErrorIcon);
    expect(await screen.findByText("fileScanError")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    await commonAccessibilityTests(
      render(<CertificateUploadModal {...defaultProps} />)
    );
  });
});
