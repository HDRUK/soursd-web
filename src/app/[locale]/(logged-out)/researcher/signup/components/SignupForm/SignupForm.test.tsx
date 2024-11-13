import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
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

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("does not submit when there are errors", async () => {
    renderSignupForm();

    act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
    });

    await waitFor(() => expect(mockSubmit).not.toHaveBeenCalled());
  });

  it("shows an error", async () => {
    renderSignupForm({
      mutateState: {
        isError: true,
        isLoading: false,
        error: "submitError",
      },
    });

    act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("alert").querySelector(".MuiAlert-message")?.innerHTML
      ).toEqual(
        'There was a problem signing up. Please try again or contact us at <a href="mailto:contact@speedi.com">contact@speedi.com</a>'
      );
    });
  });

  it("submits when values are defined", async () => {
    renderSignupForm();

    const email = screen.getByLabelText(/Email/);
    const firstName = screen.getByLabelText(/First name/);
    const lastName = screen.getByLabelText(/Last name/);
    const password = screen.getByLabelText(/Password/);
    const tscs = screen.getByLabelText("Accept terms and conditions");

    const emailValue = faker.internet.email();
    const firstNameValue = faker.person.firstName();
    const lastNameValue = faker.person.lastName();
    const passwordValue = "A!2sghjs";

    if (email && firstName && lastName && password && tscs) {
      act(() => {
        fireEvent.change(email, {
          target: {
            value: emailValue,
          },
        });
        fireEvent.change(firstName, {
          target: {
            value: firstNameValue,
          },
        });
        fireEvent.change(lastName, {
          target: {
            value: lastNameValue,
          },
        });
        fireEvent.change(password, {
          target: {
            value: passwordValue,
          },
        });
        fireEvent.click(tscs);

        fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
      });

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          {
            email: emailValue,
            first_name: firstNameValue,
            last_name: lastNameValue,
            password: passwordValue,
            tscs: true,
          },
          expect.objectContaining({
            target: expect.any(Object),
          })
        );
      });
    } else {
      fail("First name, last name, password, email or tscs do not exist");
    }
  });
});
