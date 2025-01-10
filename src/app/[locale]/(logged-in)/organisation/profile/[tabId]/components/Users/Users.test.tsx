import { useStore } from "@/data/store";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Users from "./Users";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

const defaultOrganisation = mockedOrganisation();

(useStore as unknown as jest.Mock).mockReturnValue(defaultOrganisation);

describe("<User />", () => {
  it("has no accessibility validations", async () => {
    const { container } = render(<Users />);

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("has the correct number of results", async () => {
    render(<Users />);

    const results = await screen.findAllByRole("listitem");

    expect(results).toHaveLength(2);
  });

  it("has the correct content", async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText("Invited on: 01/01/2024"));
    });

    await waitFor(() => {
      expect(screen.getByText("John Smith"));
    });
  });

  it("handles pagination correctly", async () => {
    render(<Users />);

    expect(await screen.findByText("Page 1 of 2")).toBeInTheDocument();

    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });

    const prevButton = screen.getByLabelText("Go to previous page");
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });
  });
});
