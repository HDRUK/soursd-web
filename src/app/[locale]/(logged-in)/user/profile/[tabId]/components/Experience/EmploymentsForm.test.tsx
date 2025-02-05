import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@/utils/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockedUser } from "@/mocks/data/user";
import EmploymentsForm from "./EmploymentsForm";
jest.mock("@/components/GoogleAutocomplete/actions", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import fetchPredictions from "@/components/GoogleAutocomplete/actions";

// Mock the dependencies
jest.mock("@/data/store", () => ({
  useStore: jest.fn(() => ({
    config: {
      user: mockedUser(),
    },
  })),
}));

const mockOnSubmit = jest.fn();

describe("EmploymentsForm", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <EmploymentsForm onSubmit={mockOnSubmit} />
      </QueryClientProvider>
    );
  };

  it("renders the form correctly", () => {
    renderComponent();
    expect(screen.getByText("Add Employment")).toBeInTheDocument();
  });

  it("expands the form when clicked", async () => {
    renderComponent();
    const accordion = screen.getByText("Add Employment");
    fireEvent.click(accordion);
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", { name: /Employer name/i })
      ).toBeInTheDocument();
    });
  });

  it("renders the country select box", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /country/i })
      ).toBeInTheDocument();
    });
  });

  it("updates the country select box when an address is selected", async () => {
    (fetchPredictions as jest.Mock).mockResolvedValueOnce([
      {
        addressFields: {
          postcode: "12345",
          addressLine1: "123 Main St",
          county: "Springfield",
          country: "United Kingdom",
        },
      },
    ]);

    renderComponent();

    const autoCompleteComponent = screen.getByTestId("google-autocomplete");

    const inputField = within(autoCompleteComponent).getByRole("combobox");

    fireEvent.change(inputField, { target: { value: "123" } });

    await waitFor(() => {
      expect(fetchPredictions).toHaveBeenCalledWith("123");
      expect(screen.getByText("123 Main St, Springfield")).toBeInTheDocument();
    });

    const option = screen.getByText("123 Main St, Springfield");
    fireEvent.click(inputField);
    fireEvent.click(option);
    await waitFor(() => {
      expect(inputField).toHaveValue("123 Main St, Springfield");
    });

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: /country/i })).toHaveValue(
        "United Kingdom"
      );
    });
  });
});
