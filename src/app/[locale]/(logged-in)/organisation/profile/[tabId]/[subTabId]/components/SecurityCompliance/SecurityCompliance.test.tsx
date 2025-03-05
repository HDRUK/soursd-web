import {
  render,
  screen,
  fireEvent,
  waitFor,
  commonAccessibilityTests,
} from "@/utils/testUtils";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { dateToString } from "@/utils/date";
import { mockUseStore } from "jest.setup";
import SecurityCompliance from "./SecurityCompliance";

const mockMutateAsync = jest.fn(() => Promise.resolve());
const mockRefetchQueries = jest.fn(() => Promise.resolve());
const mockRefetchOrganisations = jest.fn(() => Promise.resolve());
const mockCancelQueries = jest.fn(() => Promise.resolve());

jest.mock("@tanstack/react-query");
jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

const mockOrganisation = mockedOrganisation();

const renderComponent = () => render(<SecurityCompliance />);

describe("<SecurityCompliance />", () => {
  beforeEach(() => {
    mockUseStore({
      getOrganisation: () => mockOrganisation,
    });

    (useQuery as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: { data: [] },
      refetch: mockRefetchOrganisations,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    (useQueryClient as jest.Mock).mockReturnValue({
      refetchQueries: mockRefetchQueries,
      cancelQueries: mockCancelQueries,
    });
  });

  it("renders the component correctly", async () => {
    renderComponent();

    expect(screen.getByText("Data Security Compliance")).toBeInTheDocument();
    expect(screen.getByText("Cyber Essentials Certified")).toBeInTheDocument();
    expect(
      screen.getByText("Cyber Essentials Plus Certified")
    ).toBeInTheDocument();
    expect(screen.getAllByText("ISO27001 Accredited")).not.toHaveLength(0);
    expect(screen.getByText("DSPT Certified")).toBeInTheDocument();
    const uploadEvidenceElements = screen.getAllByText("Upload evidence");
    expect(uploadEvidenceElements).toHaveLength(4);
  });

  it("shows validation errors when submitting an incomplete form", async () => {
    renderComponent();

    fireEvent.change(
      screen.getByTestId("ce_certification_num").querySelector("input")!,
      {
        target: { value: "1234" },
      }
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("ce_certification_num").querySelector("input")!
      ).toHaveValue("1234");
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(
        screen.getByText("An expiry date for your code needs to be set.")
      ).toBeInTheDocument();
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it("submits form successfully when required fields are filled", async () => {
    renderComponent();

    fireEvent.change(
      screen.getByTestId("ce_certification_num").querySelector("input")!,
      {
        target: { value: "1234" },
      }
    );

    const dateInput = screen.queryByTestId("ce_expiry_date");
    expect(dateInput).toBeInTheDocument();

    fireEvent.click(dateInput!);

    const currentDate = new Date();
    const currentDay = format(currentDate, "dd");

    // pick the 10th day of the current month/year
    const dateButton = screen.getByRole("gridcell", { name: currentDay });
    expect(dateButton).toBeInTheDocument();

    fireEvent.click(dateButton!);

    await waitFor(() => {
      expect(
        screen.getByTestId("ce_certification_num").querySelector("input")!
      ).toHaveValue("1234");
      expect(screen.getByTestId("ce_expiry_date")!).toHaveValue(
        dateToString(currentDate, "dd/MM/yyyy")
      );
    });

    const save = screen.getByText(/save/i);
    expect(save).toBeInTheDocument();
    fireEvent.click(save);

    await waitFor(() => {
      expect(screen.getByText("Organisation Updated!")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          ce_certification_num: "1234",
          ce_expiry_date: dateToString(currentDate),
        })
      );
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderComponent());
  });
});
