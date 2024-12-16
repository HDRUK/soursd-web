import { mockedOrganisation } from "@/mocks/data/organisation";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/data/store";
import { axe } from "jest-axe";
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
  it("has no accessibility validations", async () => {
    const { container } = render(<Details />);

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

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
