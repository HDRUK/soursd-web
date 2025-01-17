import React from "react";
import { render, screen, fireEvent, waitFor } from "@/utils/testUtils";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { postEmployments } from "@/services/employments";
import { showAlert } from "@/utils/showAlert";
import { mockedUser } from "@/mocks/data/user";
import EmploymentsForm from "./EmploymentsForm";

// Mock the dependencies
jest.mock("@/services/employments");
jest.mock("@/utils/showAlert");
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
      expect(screen.getByLabelText("Employer name")).toBeInTheDocument();
    });
  });

  it("submits the form with correct data", async () => {
    (postEmployments as jest.Mock).mockResolvedValue({});
    renderComponent();

    fireEvent.click(screen.getByText("Add Employment"));

    await userEvent.type(
      screen.getByLabelText("Employer name"),
      "Test Company"
    );
    await userEvent.type(screen.getByLabelText("Department"), "IT Department");
    await userEvent.type(screen.getByLabelText("Address 1"), "123 Test St");
    await userEvent.type(screen.getByLabelText("Address 2"), "Test Rd");
    await userEvent.type(screen.getByLabelText("Town"), "Test Town");
    await userEvent.type(screen.getByLabelText("County"), "Test County");
    await userEvent.type(screen.getByLabelText("Country"), "Test Country");
    await userEvent.type(screen.getByLabelText("Postcode"), "12345");
    await userEvent.type(screen.getByLabelText("Role"), "Software Developer");
    await userEvent.type(screen.getByLabelText("ROR ID"), "012345678");

    const fromDatePicker = screen.getByLabelText("From");

    fireEvent.click(fromDatePicker);
    fireEvent.click(screen.getByRole("button", { name: "Previous month" }));
    fireEvent.click(screen.getAllByRole("gridcell", { name: "1" })[0]);

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(postEmployments).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(showAlert).toHaveBeenCalledWith("success", expect.anything());
    });
  });

  it('disables "to" field when "is_current" is checked', async () => {
    renderComponent();

    // Expand the form
    fireEvent.click(screen.getByText("Add Employment"));

    const isCurrentCheckbox = screen.getByLabelText("Current Role?");
    const toField = screen.getByLabelText("To");

    expect(toField).not.toBeDisabled();

    await userEvent.click(isCurrentCheckbox);

    expect(toField).toBeDisabled();
  });
});
