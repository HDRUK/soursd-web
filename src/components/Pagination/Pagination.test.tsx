import Pagination from "@/components/Pagination";
import { render, fireEvent } from "@/utils/testUtils";

describe("Pagination", () => {
  it("calls onChange callback", () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <Pagination count={10} onChange={handleChange} />
    );

    const pageTwoButton = getByText("2");
    fireEvent.click(pageTwoButton);

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });
});
