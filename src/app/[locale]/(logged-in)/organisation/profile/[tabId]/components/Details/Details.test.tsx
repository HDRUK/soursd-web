import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { act, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Details from "./Details";

jest.mock("@/data/store");

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

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

    const firstName = screen.getByLabelText("First name");
    const lastName = screen.getByLabelText("Last name");

    await waitFor(() => {
      expect(firstName).toHaveValue(defaultUser.first_name);
      expect(lastName).toHaveValue(defaultUser.last_name);
    });
  });
});
