import Pagination from "@/components/Pagination";
import { render, fireEvent } from "@/utils/testUtils";

describe("Pagination", () => {
    it("renders without crashing", () => {
        const wrapper = render(<Pagination count={10} onChange={() => null} />);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("calls onChange callback", () => {
        const handleChange = jest.fn();
        const { getByText } = render(
            <Pagination count={10} onChange={handleChange} />
        );

        const pageTwoButton = getByText("2");
        fireEvent.click(pageTwoButton);

        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 2);
    });
    it("should return empty div if still loading", () => {
        const wrapper = render(
            <Pagination count={10} isLoading onChange={() => null} />
        );

        expect(wrapper.container).toMatchSnapshot();
    });
});
