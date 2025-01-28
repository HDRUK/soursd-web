import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import FileUploadDetails, { FileUploadDetailsProps } from "./FileUploadDetails";

const mockOnFileChange = jest.fn();
const mockUploadClick = jest.fn();

jest.mock("pretty-bytes", () => (value: number) => value);

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => ({
    current: {
      click: mockUploadClick(),
    },
  }),
}));

const fileTypes = ["CV", "Certification"] as const;
const renderFileUploadDetails = (props?: Partial<FileUploadDetailsProps>) => {
  return render(
    <FileUploadDetails
      fileType={props?.fileType || "cv"}
      fileName={faker.system.fileName()}
      onFileChange={mockOnFileChange}
      {...props}
    />
  );
};

describe("<FileUploadDetails />", () => {
  it("shows the correct filename", async () => {
    renderFileUploadDetails({
      fileName: "sample.doc",
    });

    expect(screen.getByText("sample.doc")).toBeInTheDocument();
  });

  it("calls file input", async () => {
    renderFileUploadDetails();

    await act(() => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(mockUploadClick).toHaveBeenCalled();
  });

  it.each(fileTypes)("uploads a file of type %s", async fileType => {
    renderFileUploadDetails({
      isFileUploading: true,
      fileType,
    });

    await act(() => {
      fireEvent.change(screen.getByLabelText(`${fileType} file input`));
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("shows a loader", async () => {
    renderFileUploadDetails({
      isFileUploading: true,
    });

    expect(screen.getByTestId("UploadLink-loader")).toBeInTheDocument();
  });

  it.each(fileTypes)("shows a file size error for type %s", async fileType => {
    renderFileUploadDetails({
      isFileSizeTooBig: true,
      fileType,
    });

    expect(
      screen.getByText(
        `Your ${fileType} must be under ${MAX_UPLOAD_SIZE_BYTES}`
      )
    ).toBeInTheDocument();
  });

  it.each(fileTypes)(
    "shows a file infected status for type %s",
    async fileType => {
      renderFileUploadDetails({
        isFileOk: false,
        fileType,
      });

      expect(
        screen.getByTitle(`Your ${fileType} filemay have a virus`)
      ).toBeInTheDocument();
    }
  );

  it.each(fileTypes)("shows a file ok status for type %", async fileType => {
    renderFileUploadDetails({
      isFileOk: true,
      fileType,
    });

    expect(
      screen.getByTitle(`${fileType} was successfully scanned`)
    ).toBeInTheDocument();
  });

  it("shows a file scanning status", async () => {
    renderFileUploadDetails({
      isFileScanning: true,
    });

    expect(screen.getByRole(`progressbar`)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderFileUploadDetails());
  });
});
