import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import SignupForm, { SignupFormProps } from "./SignupForm";
import { mockedOrganisation } from "@/mocks/data/organisation";

const mockSubmit = jest.fn();

const defaultOrganisation = mockedOrganisation();

const renderSignupForm = (
  props: Partial<SignupFormProps> = {
    mutateState: { isLoading: false, isError: false },
  }
) => {
  return render(
    <SignupForm
      defaultOrganisation={defaultOrganisation.id.toString()}
      organisations={[defaultOrganisation]}
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

    act(() => {
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

    const email = screen.getByLabelText(/Email/);
    const firstName = screen.getByLabelText(/First name/);
    const lastName = screen.getByLabelText(/Last name/);
    const password = screen.getByLabelText(/Password/);
    const confirmPassword = screen.getByLabelText(/Confirm password/);
    const tscs = screen.getByLabelText("Accept terms and conditions");
    const consentScrape = screen.getByLabelText(
      "Gather my historical experience as a Researcher"
    );
    const recaptcha = screen.getByTestId("recaptcha");

    const emailValue = faker.internet.email();
    const firstNameValue = faker.person.firstName();
    const lastNameValue = faker.person.lastName();
    const passwordValue = "A!2sghjs";
    const confirmPasswordValue = passwordValue;

    if (
      email &&
      firstName &&
      lastName &&
      password &&
      confirmPassword &&
      tscs &&
      consentScrape
    ) {
      await act(async () => {
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
        fireEvent.change(confirmPassword, {
          target: { value: confirmPasswordValue },
        });
        fireEvent.click(tscs);
        fireEvent.click(consentScrape);
        fireEvent.click(recaptcha);

        fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
      });

      expect(mockSubmit).toHaveBeenCalledWith({
        confirmPassword: confirmPasswordValue,
        consentScrape: true,
        email: emailValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        organisation: `${defaultOrganisation.id}`,
        password: passwordValue,
        tscs: true,
      });
    } else {
      fail(
        "First name, last name, password, confirm password, tscs or consentScrape do not exist"
      );
    }
  });
});
