import { act, render, screen, userEvent, waitFor } from "@/utils/testUtils";
import SearchField, { SearchFieldProps } from "./SearchField";

const defaultProps = {
  onSearch: jest.fn(),
  onClear: jest.fn(),
};

const setupTest = (props?: Partial<SearchFieldProps>) => {
  render(<SearchField {...defaultProps} {...props} />);
};

describe("<SearchField />", () => {
  it("renders warning message if no project details", async () => {
    setupTest();

    act(() => {
      const searchInput = screen.getByRole("textbox");

      userEvent.type(searchInput, "hdruk{enter}");
    });

    await waitFor(() => {
      expect(defaultProps.onSearch).toHaveBeenCalledWith("hdruk");
    });
  });

  it("renders warning message if no project details", async () => {
    setupTest();

    act(async () => {
      const searchInput = screen.getByRole("textbox");
      userEvent.type(searchInput, "hdruk");

      const clearButton = await screen.findByTitle("Clear");

      if (!clearButton) {
        fail("Could not find clear button");
      }

      userEvent.click(clearButton);
    });

    await waitFor(() => {
      expect(defaultProps.onClear).toHaveBeenCalled();
    });
  });
});
