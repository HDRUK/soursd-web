import Pagination from "../Pagination";
import { render, fireEvent, act } from "../../utils/testUtils";

describe("Pagination", () => {
  it("calls onChange callback", async () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <Pagination count={10} onChange={handleChange} />
    );

    await act(() => {
      const pageTwoButton = getByText("2");
      fireEvent.click(pageTwoButton);
    });

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });
});
