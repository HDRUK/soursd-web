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
      expect(
        screen.getByRole("textbox", { name: /Employer name/i })
      ).toBeInTheDocument();
    });
  });

  it("submits the form", async () => {
    (postEmployments as jest.Mock).mockResolvedValue({});
    renderComponent();

    fireEvent.click(screen.getByText("Add Employment"));

    await userEvent.type(
      screen.getByRole("textbox", { name: /Employer name/i }),
      "Test Company"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Department/i }),
      "IT Department"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Address 1/i }),
      "123 Test St"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Address 2/i }),
      "Test Rd"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Town/i }),
      "Test Town"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /County/i }),
      "Test County"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Country/i }),
      "Test Country"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Postcode/i }),
      "12345"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Role/i }),
      "Software Developer"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /ROR ID/i }),
      "012345678"
    );

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(postEmployments).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(showAlert).toHaveBeenCalledWith("success", expect.anything());
    });
  });
});
