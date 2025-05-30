import { faker } from "@faker-js/faker";
import { mockFailedJson } from "jest.utils";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import SendInviteUser from "./SendInviteUser";

const renderSendInviteUser = () => render(<SendInviteUser />);

const renderSubmitted = async () => {
  renderSendInviteUser();

  [/First name/i, /Last name/i, /Email/i].forEach(name => {
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
};

describe("<SendInviteUser />", () => {
  it("submits the invite", async () => {
    await renderSubmitted();

    await waitFor(() => {
      expect(
        screen.getByText(/You have successfully invited the User/i)
      ).toBeTruthy();
    });
  });

  it("shows error when submit fails", async () => {
    global.fetch.mockImplementation(() => {
      return mockFailedJson(null);
    });

    await renderSubmitted();

    await waitFor(() => {
      expect(
        screen.getByText(/There was an error inviting the User/i)
      ).toBeTruthy();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderSendInviteUser());
  });
});
