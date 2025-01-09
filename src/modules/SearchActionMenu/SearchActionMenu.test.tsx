import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SearchActionMenu, { Action } from "./SearchActionMenu";

jest.mock("@mui/icons-material/FilterAlt", () => () => (
  <div data-testid="filter-icon" />
));

const mockHandleSortToggle = jest.fn();
const mockHandleFieldToggle = jest.fn();

describe("SearchActionMenu", () => {
  const searchActions: Action[] = [
    {
      label: "A-Z",
      onClick: mockHandleSortToggle,
      checked: true,
      icon: <span data-testid="icon-a-z">A-Z Icon</span>,
    },
    {
      label: "Z-A",
      onClick: mockHandleSortToggle,
      checked: false,
      icon: <span data-testid="icon-z-a">Z-A Icon</span>,
    },
    {
      label: "Approved",
      onClick: mockHandleFieldToggle,
      checked: false,
      icon: <span data-testid="icon-approved">Approved Icon</span>,
    },
  ];

  beforeEach(() => {
    render(<SearchActionMenu actions={searchActions} />);
    const filterIconButton = screen.getByTestId("filter-icon");
    expect(filterIconButton).toBeInTheDocument();
    fireEvent.click(filterIconButton);
  });

  it("renders all actions correctly", async () => {
    await waitFor(() =>
      searchActions.forEach(action => {
        expect(screen.getByText(action.label)).toBeInTheDocument();
        if (action.icon) {
          const icon = screen.getByTestId(`icon-${action.label.toLowerCase()}`);
          expect(icon).toBeInTheDocument();
        }
      })
    );
  });

  it("renders checkboxes with the correct checked state", async () => {
    await waitFor(() =>
      searchActions.forEach(action => {
        const checkbox = screen.getByLabelText(`checkbox-${action.label}`);
        expect(checkbox).toBeInTheDocument();

        if (action.checked) {
          expect(checkbox).toBeChecked();
        } else {
          expect(checkbox).not.toBeChecked();
        }
      })
    );
  });

  it("calls the correct handler on action click", () => {
    const firstAction = screen.getByText("A-Z");
    fireEvent.click(firstAction);

    expect(mockHandleSortToggle).toHaveBeenCalled();
  });
});
