import { MutationState, QueryState } from "../../types/form";
import { fireEvent, renderHook, screen, waitFor } from "../../utils/testUtils";
import useQueryConfirmAlerts from "./useQueryConfirmAlerts";

const renderTest = (queryState: QueryState | MutationState) =>
  renderHook(() => useQueryConfirmAlerts(queryState));

describe("useQueryConfirmAlerts", () => {
  it("show the delete alert", async () => {
    const init = renderTest({
      isSuccess: false,
      isError: false,
    });

    init.result.current();

    await waitFor(() => {
      expect(screen.getByText(/Delete/)).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        /Are you sure you want to delete this data\? This action may be permanent./
      )
    ).toBeInTheDocument();
  });

  it("show the error alert", async () => {
    const init = renderTest({
      isSuccess: false,
      isError: true,
    });

    init.result.current();

    const deleteButton = screen.getByRole("button", {
      name: /Delete/,
    });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });
});
