import React from "react";
import { render, screen, fireEvent, waitFor } from "@/utils/testUtils";
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

  it("submits the form with correct data", async () => {
    (postEmployments as jest.Mock).mockResolvedValue({});
    renderComponent();

    fireEvent.click(screen.getByText("Add Employment"));

    const formData = {
      "Employer name": "Test Company",
      Department: "IT Department",
      "Address 1": "123 Test St",
      "Address 2": "Test Rd",
      Town: "Test Town",
      County: "Test County",
      Country: "Test Country",
      Postcode: "12345",
      Role: "Software Developer",
      "ROR ID": "012345678",
    };

    Object.entries(formData).forEach(([label, value]) => {
      const input = screen.getByRole("textbox", {
        name: new RegExp(label, "i"),
      });
      fireEvent.change(input, { target: { value } });
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(postEmployments).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(showAlert).toHaveBeenCalledWith("success", expect.anything());
    });
  });
});
