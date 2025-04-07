import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import Users from "./Users";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultUser,
  null,
]);

describe("<User />", () => {
  it("has the correct number of results", async () => {
    render(<Users variant="custodian" />);

    const results = await screen.findAllByRole("listitem");

    expect(results).toHaveLength(2);
  });

  it("has the correct content", async () => {
    render(<Users variant="custodian" />);

    await waitFor(() => {
      expect(screen.getAllByText("Added on: 01/01/2024")[0]);
    });

    await waitFor(() => {
      expect(screen.getByText("John Smith"));
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Users variant="custodian" />));
  });
});
