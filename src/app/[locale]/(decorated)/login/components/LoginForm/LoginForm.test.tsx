import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import LoginForm, { LoginFormProps } from "./LoginForm";

const mockSubmit = jest.fn();

const renderLoginForm = (props?: Partial<LoginFormProps>) => {
  return render(
    <LoginForm
      mutateState={{ isLoading: false, isError: false }}
      onSubmit={mockSubmit}
      {...props}
    />
  );
};

describe("<LoginForm />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderLoginForm();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("does not submit when values are not defined", async () => {
    renderLoginForm();

    act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Login/i }));
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("shows an error", async () => {
    renderLoginForm({
      mutateState: {
        isError: true,
        isLoading: false,
        error: "submitError",
      },
    });

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Login/i }));
    });

    expect(
      screen.getByRole("alert").querySelector(".MuiAlert-message")?.innerHTML
    ).toEqual(
      'There was a problem validating your user. Please try again or contact us at <a href="mailto:contact@speedi.com">contact@speedi.com</a>'
    );
  });

  it("submits when values are defined", async () => {
    renderLoginForm();

    const password = screen.getByLabelText("Password").querySelector("input");
    const email = screen.getByLabelText("Email").querySelector("input");
    const recaptcha = screen.getByTestId("recaptcha");

    const emailValue = faker.internet.email();
    const passwordValue = faker.string.sample();

    if (email && password) {
      act(() => {
        fireEvent.change(email, {
          target: {
            value: emailValue,
          },
        });
        fireEvent.change(password, {
          target: { value: passwordValue },
        });

        fireEvent.click(recaptcha);

        fireEvent.submit(screen.getByRole("button", { name: /Login/i }));
      });

      waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    } else {
      fail("Email or password do not exist");
    }
  });
});
