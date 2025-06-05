import { faker } from "@faker-js/faker";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import InviteCustodian from "./InviteCustodian";

jest.mock("@/data/store");

const mockSubmit = jest.fn();

const renderInviteCustodianComponent = () => {
  return render(
    <InviteCustodian
      onSubmit={mockSubmit}
      queryState={{
        isPending: false,
        isError: false,
        error: "",
      }}
    />
  );
};

describe("<InviteCustodian />", () => {
  it.each(["name", "contact_email"])(
    "does not submit when %s is not defined",
    async fieldName => {
      const { container } = renderInviteCustodianComponent();

      const input = container.querySelector(`input[name=${fieldName}]`);

      if (input) {
        fireEvent.change(input, { target: { value: faker.string.sample() } });

        const button = screen.getByRole("button", { name: /invite/i });

        await act(() => {
          fireEvent.submit(button);
        });

        expect(button).not.toBeDisabled();

        await waitFor(() => {
          expect(mockSubmit).not.toHaveBeenCalled();
        });
      } else {
        throw new Error(`Could not find input ${fieldName}`);
      }
    }
  );

  it("submits with the correct fields", async () => {
    renderInviteCustodianComponent();

    [/Name/i, /Contact email/i].forEach(name => {
      const input = screen.getByRole("textbox", { name });
      const inputValue = faker.internet.email();

      fireEvent.change(input, {
        target: { value: inputValue },
      });
    });

    const button = screen.getByRole("button", { name: /invite/i });

    await act(() => {
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderInviteCustodianComponent());
  });
});
