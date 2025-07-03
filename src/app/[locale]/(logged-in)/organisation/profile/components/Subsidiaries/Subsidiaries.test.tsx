import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import Subsidiaries from "./Subsidiaries";

jest.mock("@tanstack/react-query");

const mockMutateAsync = jest.fn();
const mockRefetchOrganisations = jest.fn();
const mockSetOrganisation = jest.fn();

(useMutation as unknown as jest.Mock).mockReturnValue({
  mutateAsync: mockMutateAsync,
  isError: false,
  isPending: false,
  error: "",
});

(useQuery as unknown as jest.Mock).mockReturnValue({
  refetch: mockRefetchOrganisations.mockResolvedValue({ data: [] }),
});

describe("<Subsidiaries />", () => {
  beforeEach(() => {
    mockUseStore({
      setOrganisation: mockSetOrganisation,
    });
  });

  it("Put of organisation is called on save", async () => {
    render(<Subsidiaries />);

    await waitFor(() => {
      expect(screen.queryByTestId("form-modal")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /add a subsidiary/i }));

    await waitFor(() => {
      expect(screen.getByTestId("form-modal")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByTestId("subsidiary_name").querySelector("input")!,
      {
        target: { value: "Random Name" },
      }
    );

    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByTestId("form-modal")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Line 1 of the address is required")
      ).toBeInTheDocument();
    });
  });

  it("Put of organisation is called on save", async () => {
    render(<Subsidiaries />);

    await waitFor(() => {
      expect(screen.queryByTestId("form-modal")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /add a subsidiary/i }));

    await waitFor(() => {
      expect(screen.getByTestId("form-modal")).toBeInTheDocument();
    });

    const fieldValues = [
      { testId: "subsidiary_name", value: "Random Name" },
      { testId: "subsidiary_address.address_1", value: "123 Random Street" },
      { testId: "subsidiary_address.address_2", value: "Apt 456" },
      { testId: "subsidiary_address.town", value: "Random Town" },
      { testId: "subsidiary_address.country", value: "United Kingdom" },
      { testId: "subsidiary_address.postcode", value: "12345" },
    ];

    fieldValues.forEach(({ testId, value }) => {
      fireEvent.change(screen.getByTestId(testId).querySelector("input")!, {
        target: { value },
      });
    });

    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
      expect(mockRefetchOrganisations).toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Subsidiaries />));
  });
});
