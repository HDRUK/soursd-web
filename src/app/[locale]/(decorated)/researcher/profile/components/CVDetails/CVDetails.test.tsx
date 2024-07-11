import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import CVDetails from ".";
import { CVDetailsProps } from "./CVDetails";

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

const renderCVDetails = (props?: Partial<CVDetailsProps>) => {
  return render(
    <CVDetails
      fileName={faker.system.fileName()}
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
    renderCVDetails({
      isFileUploading: true,
    });

    await act(() => {
      fireEvent.change(screen.getByLabelText("CV file input"));
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("show a loader", async () => {
    renderCVDetails({
      isFileUploading: true,
    });

    expect(screen.getByTestId("UploadLink-loader")).toBeInTheDocument();
  });

  it("show a file size error", async () => {
    renderCVDetails({
      isFileSizeTooBig: true,
    });

    expect(
      screen.getByText(`Your CV must be under ${MAX_UPLOAD_SIZE_BYTES}`)
    ).toBeInTheDocument();
  });

  it("show a file infected status", async () => {
    renderCVDetails({
      isFileOk: false,
    });

    expect(screen.getByTitle(`Your CV may have a virus`)).toBeInTheDocument();
  });

  it("show a file ok status", async () => {
    renderCVDetails({
      isFileOk: true,
    });

    expect(screen.getByTitle(`CV was sucessfully scanned`)).toBeInTheDocument();
  });

  it("show a file ok status", async () => {
    renderCVDetails({
      isFileScanning: true,
    });

    expect(screen.getByRole(`progressbar`)).toBeInTheDocument();
  });
});
