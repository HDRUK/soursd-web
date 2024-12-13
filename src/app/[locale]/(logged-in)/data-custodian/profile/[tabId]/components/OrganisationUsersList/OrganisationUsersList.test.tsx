import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EntityType } from "@/types/api";
import { QueryState } from "@/types/form";
import { mockedOrganisation } from "@/mocks/data/organisation";
import OrganisationUsersList from "./OrganisationUsersList";

// Mock translation hook
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/context/ApplicationData", () => ({
  useApplicationData: () => ({
    routes: {
      permissionsResearcherCustodian: {
        path: "/permissions",
      },
    },
  }),
}));

const mockOrganisation = mockedOrganisation();

const mockQueryClient = new QueryClient();

describe("OrganisationUsersList", () => {
  const mockQueryState: QueryState = {
    isLoading: false,
    isError: false,
    isSuccess: true,
  };

  const mockOnApproveToggle = jest.fn();

  it("renders the users list with user data", () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <OrganisationUsersList
          organisation={mockOrganisation}
          queryState={mockQueryState}
          onApproveToggle={mockOnApproveToggle}
        />
      </QueryClientProvider>
    );

    expect(screen.getByText("emailHeading")).toBeInTheDocument();
    expect(screen.getByText("firstNameHeading")).toBeInTheDocument();
    expect(screen.getByText("lastNameHeading")).toBeInTheDocument();

    expect(screen.getByText("john.smith@hdruk.ac.uk")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
  });

  it("calls onApproveToggle when the approve button is clicked", () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <OrganisationUsersList
          organisation={mockOrganisation}
          queryState={mockQueryState}
          onApproveToggle={mockOnApproveToggle}
        />
      </QueryClientProvider>
    );

    const menuButton = screen.queryAllByRole("button")[0];
    fireEvent.click(menuButton);

    const approveButton = screen.getByText("approved");
    fireEvent.click(approveButton);

    expect(mockOnApproveToggle).toHaveBeenCalledWith(
      {
        type: EntityType.RESEARCHER,
        user_id: 1,
        custodian_id: 1,
      },
      true
    );
  });
});
