import React from "react";
import {
  render,
  renderHook,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import GoogleAutocomplete, {
  GoogleAutocompleteProps,
} from "./GoogleAutocomplete";
import fetchPredictions from "./actions";

jest.mock("./actions", () => jest.fn());
const mockFetchPredictions = fetchPredictions as jest.Mock;
const mockOnAddressSelected = jest.fn();

const renderComponent = (props?: Partial<GoogleAutocompleteProps>) => {
  const { result } = renderHook(() => useForm());
  const { control } = result.current;

  render(
    <FormProvider {...result.current}>
      <GoogleAutocomplete
        name="address"
        control={control}
        onAddressSelected={mockOnAddressSelected}
        label="Address"
        {...props}
      />
    </FormProvider>
  );
};

describe("GoogleAutocomplete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  /*
  it("renders the component with a label", () => {
    renderComponent();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
  });
  
  it("updates input value when typing", () => {
    renderComponent();
    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "123 Main St" } });

    expect(input).toHaveValue("123 Main St");
  });
  */
  it("fetches predictions when input length >= 3 and displays options", async () => {
    mockFetchPredictions.mockResolvedValueOnce([
      {
        addressFields: {
          postcode: "12345",
          addressLine1: "123 Main St",
          county: "Springfield",
        },
      },
      {
        addressFields: {
          postcode: "67890",
          addressLine1: "123 Elm St",
          county: "Springfield",
        },
      },
    ]);

    renderComponent();

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "123" } });

    screen.debug(undefined, Infinity);
    //    return;
    await waitFor(() => {
      expect(mockFetchPredictions).toHaveBeenCalledWith("123");
      expect(screen.getByText("123 Main St, Springfield")).toBeInTheDocument();
      //expect(screen.getByText("123 Elm St, Springfield")).toBeInTheDocument();
    });
  });
  /*
  it("does not fetch predictions for input length < 3", async () => {
    renderComponent();
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "12" } });

    await waitFor(() => {
      expect(mockFetchPredictions).not.toHaveBeenCalled();
    });
  });

  it("calls onAddressSelected with the first prediction's addressFields", async () => {
    mockFetchPredictions.mockResolvedValueOnce([
      {
        addressFields: {
          postcode: "12345",
          addressLine1: "123 Main St",
          addressLine2: "",
          county: "Springfield",
        },
      },
    ]);

    renderComponent({ onAddressSelected: mockOnAddressSelected });

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "123 Main St" } });

    await waitFor(() => {
      expect(fetchPredictions).toHaveBeenCalled();
    });

    const option = await screen.findByText("123 Main St, Springfield");
    fireEvent.click(option);

    await waitFor(() => {
      expect(mockOnAddressSelected).toHaveBeenCalledWith({
        postcode: "12345",
        address_1: "123 Main St",
        address_2: "",
        county: "Springfield",
      });
    });
  });

  it("handles fetch errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    mockFetchPredictions.mockRejectedValueOnce(new Error("Network error"));

    renderComponent();

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "123" } });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching address predictions:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });*/
});
