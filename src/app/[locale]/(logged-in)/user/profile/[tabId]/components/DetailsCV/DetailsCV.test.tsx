import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import DetailsCV from ".";
import { DetailsCVProps } from "./DetailsCV";

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

const renderDetailsCV = (props?: Partial<DetailsCVProps>) => {
  return render(
    <DetailsCV
      fileName={faker.system.fileName()}
      onFileChange={mockOnFileChange}
      {...props}
    />
  );
};

describe("<DetailsCV />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderDetailsCV();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("shows the correct filename", async () => {
    renderDetailsCV({
      fileName: "sample.doc",
    });

    expect(screen.getByText("sample.doc")).toBeInTheDocument();
  });

  it("calls file input", async () => {
    renderDetailsCV();

    await act(() => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(mockUploadClick).toHaveBeenCalled();
  });

  it("uploads a file", async () => {
    renderDetailsCV({
      isFileUploading: true,
    });

    await act(() => {
      fireEvent.change(screen.getByLabelText("CV file input"));
    });

    expect(mockOnFileChange).toHaveBeenCalled();
  });

  it("show a loader", async () => {
    renderDetailsCV({
      isFileUploading: true,
    });

    expect(screen.getByTestId("UploadLink-loader")).toBeInTheDocument();
  });

  it("show a file size error", async () => {
    renderDetailsCV({
      isFileSizeTooBig: true,
    });

    expect(
      screen.getByText(`Your CV must be under ${MAX_UPLOAD_SIZE_BYTES}`)
    ).toBeInTheDocument();
  });

  it("show a file infected status", async () => {
    renderDetailsCV({
      isFileOk: false,
    });

    expect(screen.getByTitle(`Your CV may have a virus`)).toBeInTheDocument();
  });

  it("show a file ok status", async () => {
    renderDetailsCV({
      isFileOk: true,
    });

    expect(screen.getByTitle(`CV was sucessfully scanned`)).toBeInTheDocument();
  });

  it("show a file ok status", async () => {
    renderDetailsCV({
      isFileScanning: true,
    });

    expect(screen.getByRole(`progressbar`)).toBeInTheDocument();
  });
});
