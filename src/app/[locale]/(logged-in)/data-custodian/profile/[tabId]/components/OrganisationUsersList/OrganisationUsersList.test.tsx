import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryState } from "@/types/form";
import { Organisation } from "@/types/application";
import OrganisationUsersList from "./OrganisationUsersList";
import { mockedCustodian } from "@/mocks/data/custodian";
import { mockedStore as mockStore } from "@/mocks/data/store";

jest.mock("@/services/projects");

jest.mock("@/context/ApplicationData", () => ({
  useApplicationData: jest.fn().mockReturnValue({
    routes: {
      permissionsResearcherCustodian: { path: "/permissions" },
    },
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => jest.fn((key: string) => key),
}));

describe("OrganisationUsersList", () => {
  const mockOnApproveToggle = jest.fn();

  const organisation: Organisation = {
    id: 1,
    name: "Test Organisation",
    registries: [
      {
        user: {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          registry: { verified: true },
          user_group: "USERS",
          approvals: [{ id: 1, pivot: { custodian_id: 1 } }],
        },
      },
    ],
  };

  const queryState: QueryState = {
    isLoading: false,
  };

  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <OrganisationUsersList
          organisation={organisation}
          onApproveToggle={mockOnApproveToggle}
          queryState={queryState}
        />
      </QueryClientProvider>
    );

  it("renders the list of users", () => {
    renderComponent();

    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(organisation.registries.length);
    expect(screen.getByText(/John\s+Doe/)).toBeInTheDocument();
  });

  it("calls the onApproveToggle handler when approve button is clicked", () => {
    renderComponent();

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    const approveButton = screen.getByRole("button", { name: "unapprove" });
    fireEvent.click(approveButton);

    expect(mockOnApproveToggle).toHaveBeenCalledWith(
      {
        type: "RESEARCHER",
        user_id: 1,
        custodian_id: 1,
      },
      true
    );
  });
});
