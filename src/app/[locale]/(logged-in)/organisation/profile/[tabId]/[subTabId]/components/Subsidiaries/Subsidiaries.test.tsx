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

const mockMutateAsync = jest.fn();
const mockSetOrganisation = jest.fn();

(useMutation as unknown as jest.Mock).mockReturnValue({
  mutateAsync: mockMutateAsync,
  isError: false,
  isPending: true,
  error: "",
});

describe("<Subsidiaries />", () => {
  beforeEach(() => {
    mockUseStore({
      setOrganisation: mockSetOrganisation,
    });
  });

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

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Subsidiaries />));
  });
});
