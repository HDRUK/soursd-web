import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { act, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Users from "./Users";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultUser,
  null,
]);

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
      expect(screen.getByText("Added on: 01/01/2024"));
    });

    await waitFor(() => {
      expect(screen.getByText("John Smith"));
    });
  });
});
