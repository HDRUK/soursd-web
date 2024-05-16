import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import SignupForm from "./SignupForm";

const mockSubmit = jest.fn();

describe("<SignupForm />", () => {
  it("has no accessibility validations", async () => {
    const { container } = render(<SignupForm onSubmit={mockSubmit} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("displays error state when values are not defined", async () => {
    render(<SignupForm onSubmit={mockSubmit} />);

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submits when values are defined", async () => {
    render(<SignupForm onSubmit={mockSubmit} />);

    const email = screen.getByLabelText("Email").querySelector("input");
    const password = screen.getByLabelText("Password").querySelector("input");
    const confirmPassword = screen
      .getByLabelText("Confirm password")
      .querySelector("input");
    const tscs = screen
      .getByLabelText("Accept terms and conditions")
      .querySelector("input");
    const recaptcha = screen.getByTestId("recaptcha");

    const emailValue = faker.internet.email();
    const passwordValue = "A!2sghjs";
    const confirmPasswordValue = passwordValue;

    if (email && password && confirmPassword && tscs) {
      await act(() => {
        fireEvent.change(email, {
          target: {
            value: emailValue,
          },
        });
        fireEvent.change(password, {
          target: {
            value: passwordValue,
          },
        });
        fireEvent.change(confirmPassword, {
          target: { value: confirmPasswordValue },
        });
        fireEvent.click(tscs);
        fireEvent.click(recaptcha);

        fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
      });

      expect(mockSubmit).toHaveBeenCalled();
    } else {
      fail("Email, password, confirm password or tscs do not exist");
    }
  });
});
