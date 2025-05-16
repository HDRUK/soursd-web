import { MAX_UPLOAD_SIZE_BYTES, FileType } from "../../consts/files";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  userEvent,
  render,
  screen,
} from "../../utils/testUtils";
import { faker } from "@faker-js/faker";
import { capitaliseFirstLetter } from "../../utils/string";
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

const fileTypes = [FileType.CV, FileType.CERTIFICATION] as const;
const renderFileUploadDetails = (props?: Partial<FileUploadDetailsProps>) => {
  return render(
    <FileUploadDetails
      fileType={props?.fileType || FileType.CV}
      fileNameText={faker.system.fileName()}
      onFileChange={mockOnFileChange}
      {...props}
    />
  );
};
// const formatFileType = (fileType: FileType) =>
//   fileType === FileType.CERTIFICATION ? "Certification" : "CV";
describe("<FileUploadDetails />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("shows the correct filename", async () => {
    renderFileUploadDetails({
      fileNameText: "sample.doc",
    });

    expect(screen.getByText("sample.doc")).toBeInTheDocument();
  });

  it("calls file input", async () => {
    renderFileUploadDetails();

    await act(() => {
      fireEvent.click(screen.getByTestId("upload-file"));
    });

    expect(mockUploadClick).toHaveBeenCalled();
  });

  it.each(fileTypes)("uploads a file of type %s", async fileType => {
    renderFileUploadDetails({
      isUploading: true,
      fileType,
    });

    await act(() => {
      fireEvent.change(
        screen.getByLabelText(
          `${capitaliseFirstLetter(fileType.toLowerCase())} file input`
        )
      );
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("shows a loader", async () => {
    renderFileUploadDetails({
      isUploading: true,
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it.each(fileTypes)("shows a file size error for type %s", async fileType => {
    renderFileUploadDetails({
      isSizeInvalid: true,
      fileType,
    });

    expect(
      screen.getByText(`Your file must be under ${MAX_UPLOAD_SIZE_BYTES}`)
    ).toBeInTheDocument();
  });

  it.each(fileTypes)(
    "shows a file infected status for type %s",
    async fileType => {
      renderFileUploadDetails({
        isScanFailed: true,
        fileType,
      });

      const scanErrorIcon = screen.getByTestId("GppBadIcon");
      expect(scanErrorIcon).toBeInTheDocument();

      await userEvent.hover(scanErrorIcon);
      expect(
        await screen.findByText(
          `Your ${capitaliseFirstLetter(fileType.toLowerCase())} file may have a virus`
        )
      ).toBeInTheDocument();
    }
  );

  it.each(fileTypes)("shows a file ok status for type %", async fileType => {
    renderFileUploadDetails({
      isScanComplete: true,
      fileType,
    });

    const scanGoodIcon = screen.getByTestId("GppGoodIcon");
    expect(scanGoodIcon).toBeInTheDocument();

    await userEvent.hover(scanGoodIcon);
    expect(
      await screen.findByText(
        `${capitaliseFirstLetter(fileType.toLowerCase())} was successfully scanned`
      )
    ).toBeInTheDocument();
  });

  it("shows a file scanning status", async () => {
    renderFileUploadDetails({
      isScanning: true,
    });

    expect(screen.getByRole(`progressbar`)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderFileUploadDetails());
  });
});
