import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { mock200Json, mockFailedJson } from "jest.utils";
import SendInviteCustodian from "./SendInviteCustodian";

const renderSendInviteCustodian = () => render(<SendInviteCustodian />);

const renderSubmitted = async () => {
  renderSendInviteCustodian();

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
};

describe("<SendInviteCustodian />", () => {
  it("submits the invite", async () => {
    await renderSubmitted();

    await waitFor(() => {
      expect(
        screen.getByText(/You have successfully invited the Data Custodian/i)
      ).toBeTruthy();
    });
  });

  it("shows error when submit fails", async () => {
    global.fetch.mockImplementation((url: string) => {
      if (url.endsWith(`/custodians`)) {
        return mock200Json(1);
      }

      return mockFailedJson(null);
    });

    await renderSubmitted();

    await waitFor(() => {
      expect(
        screen.getByText(/There was an error inviting the Data Custodian/i)
      ).toBeTruthy();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderSendInviteCustodian());
  });
});
