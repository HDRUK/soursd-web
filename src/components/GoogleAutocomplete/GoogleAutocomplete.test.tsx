import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GoogleAutocomplete, {
  GoogleAutocompleteProps,
} from "./GoogleAutocomplete";
import fetchPredictions from "./actions";

jest.mock("./actions", () => jest.fn());

describe("GoogleAutocomplete", () => {
  const mockFetchPredictions = fetchPredictions as jest.Mock;
  const mockOnAddressSelected = jest.fn();

  const setup = (props?: Partial<GoogleAutocompleteProps>) => {
    render(
      <GoogleAutocomplete
        onAddressSelected={mockOnAddressSelected}
        label="Address"
        {...props}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with a label", () => {
    setup();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    setup();
    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "123 Main St" } });

    expect(input).toHaveValue("123 Main St");
  });

  it("fetches predictions when input length >= 3 and displays options", async () => {
    mockFetchPredictions.mockResolvedValueOnce([
      {
        description: "123 Main St, Springfield",
        addressFields: { postcode: "12345" },
      },
      {
        description: "123 Elm St, Springfield",
        addressFields: { postcode: "67890" },
      },
    ]);

    setup();

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "123" } });

    await waitFor(() => {
      expect(mockFetchPredictions).toHaveBeenCalledWith("123");
      expect(screen.getByText("123 Main St, Springfield")).toBeInTheDocument();
      expect(screen.getByText("123 Elm St, Springfield")).toBeInTheDocument();
    });
  });

  it("does not fetch predictions for input length < 3", async () => {
    setup();
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "12" } });

    await waitFor(() => {
      expect(mockFetchPredictions).not.toHaveBeenCalled();
    });
  });

  it("calls onAddressSelected with the first prediction's addressFields", async () => {
    mockFetchPredictions.mockResolvedValueOnce([
      {
        description: "123 Main St, Springfield",
        addressFields: { postcode: "12345" },
      },
    ]);

    setup({ onAddressSelected: mockOnAddressSelected });

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "123" } });

    await waitFor(() => {
      expect(mockOnAddressSelected).toHaveBeenCalledWith({ postcode: "12345" });
    });
  });

  it("handles fetch errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    mockFetchPredictions.mockRejectedValueOnce(new Error("Network error"));

    setup();

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "123" } });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching address predictions:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
