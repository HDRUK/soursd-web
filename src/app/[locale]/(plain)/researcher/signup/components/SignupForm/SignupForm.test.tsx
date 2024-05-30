import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import SignupForm, { SignupFormProps } from "./SignupForm";

const mockSubmit = jest.fn();

const mockedOrganisation = {
  organisation_unique_id: faker.string.uuid(),
  organisation_name: faker.company.name(),
  id: faker.number.int(),
};

const renderSignupForm = (
  props: Partial<SignupFormProps> = {
    mutateState: { isLoading: false, isError: false },
  }
) => {
  return render(
    <SignupForm
      defaultOrganisation={mockedOrganisation.id.toString()}
      organisations={[mockedOrganisation]}
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

  it("does not submit when there are errors", async () => {
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

    const firstName = screen
      .getByLabelText("First name")
      .querySelector("input");
    const lastName = screen.getByLabelText("Last name").querySelector("input");
    const password = screen.getByLabelText("Password").querySelector("input");
    const confirmPassword = screen
      .getByLabelText("Confirm password")
      .querySelector("input");
    const tscs = screen
      .getByLabelText("Accept terms and conditions")
      .querySelector("input");
    const recaptcha = screen.getByTestId("recaptcha");

    const firstNameValue = faker.person.firstName();
    const lastNameValue = faker.person.lastName();
    const passwordValue = "A!2sghjs";
    const confirmPasswordValue = passwordValue;

    if (firstName && lastName && password && confirmPassword && tscs) {
      await act(async () => {
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
        fireEvent.change(confirmPassword, {
          target: { value: confirmPasswordValue },
        });
        fireEvent.click(tscs);
        fireEvent.click(recaptcha);

        fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
      });

      expect(mockSubmit).toHaveBeenCalled();
    } else {
      fail(
        "First name, last name, password, confirm password or tscs do not exist"
      );
    }
  });
});
