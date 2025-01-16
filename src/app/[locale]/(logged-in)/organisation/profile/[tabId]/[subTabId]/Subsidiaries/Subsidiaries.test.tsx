import { useStore } from "@/data/store";
import { mockedOrganisation } from "@/mocks/data/organisation";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import Subsidiaries from "./Subsidiaries";

jest.mock("@tanstack/react-query");
jest.mock("@/data/store");

const mockMutateAsync = jest.fn();
const mockSetOrganisation = jest.fn();

const defaultOrganisation = mockedOrganisation();

(useStore as unknown as jest.Mock).mockImplementation(() => ({
  organisation: defaultOrganisation,
  sectors: [],
  setOrganisation: mockSetOrganisation,
}));

(useMutation as unknown as jest.Mock).mockReturnValue({
  mutateAsync: mockMutateAsync,
  isError: false,
  isPending: true,
  error: "",
});

describe("<Subsidiaries />", () => {
  commonAccessibilityTests(render(<Subsidiaries />));

  it("Patch of organisation is called on save", async () => {
    render(<Subsidiaries />);

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockSetOrganisation).toHaveBeenCalled();
    });
  });
});
