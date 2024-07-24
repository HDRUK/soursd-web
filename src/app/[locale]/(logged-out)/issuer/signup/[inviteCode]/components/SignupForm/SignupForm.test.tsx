import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import SignupForm, { SignupFormProps } from "./SignupForm";

const mockSubmit = jest.fn();

const renderSignupForm = (
  props: Partial<SignupFormProps> = {
    mutateState: { isLoading: false, isError: false },
  }
) => {
  return render(
    <SignupForm
      mutateState={{ isLoading: false, isError: false }}
      onSubmit={mockSubmit}
      {...props}
    />
  );
};

describe("<SignupForm />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderSignupForm();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("does not submit when values are not defined", async () => {
    renderSignupForm();

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("shows an error", async () => {
    renderSignupForm({
      mutateState: {
        isError: true,
        isLoading: false,
        error: "submitError",
      },
    });

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
    });

    expect(
      screen.getByRole("alert").querySelector(".MuiAlert-message")?.innerHTML
    ).toEqual(
      'There was a problem signing up. Please try again or contact us at <a href="mailto:contact@speedi.com">contact@speedi.com</a>'
    );
  });

  it("submits when values are defined", async () => {
    renderSignupForm();

    const password = screen.getByLabelText("Password").querySelector("input");
    const confirmPassword = screen
      .getByLabelText("Confirm password")
      .querySelector("input");
    const tscs = screen
      .getByLabelText("Accept terms and conditions")
      .querySelector("input");
    const recaptcha = screen.getByTestId("recaptcha");

    const passwordValue = "A!2sghjs";
    const confirmPasswordValue = passwordValue;

    if (password && confirmPassword && tscs) {
      await act(() => {
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
      fail("Password, confirm password or tscs do not exist");
    }
  });
});
