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
import Details from "./Details";

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

describe("<Details />", () => {
  commonAccessibilityTests(render(<Details />));

  it("has the correct values", async () => {
    render(<Details />);

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockSetOrganisation).toHaveBeenCalled();
    });
  });
});
