import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import SignupFormDetails, { SignupFormDetailsProps } from "./SignupFormDetails";

const mockOnSubmit = jest.fn();

const renderSignupForm = (props?: Partial<SignupFormDetailsProps>) => {
  return render(
    <SignupFormDetails
      defaultValues={{
        organisation_name: "",
        lead_applicant_email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        tscs: false,
        companies_house_no: "",
      }}
      onSubmit={mockOnSubmit}
      {...props}
    />
  );
};

describe("<SignupFormDetails />", () => {
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

    fireEvent.submit(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("submits when values are defined", async () => {
    renderSignupForm();

    const organisation_name = screen.getByLabelText(/Organisation name/);
    const lead_applicant_email = screen.getByLabelText(/Applicant email/);
    const first_name = screen.getByLabelText(/First name/);
    const last_name = screen.getByLabelText(/Last name/);
    const password = screen.getByLabelText(/Password/);
    const confirm_password = screen.getByLabelText(/Confirm password/);
    const companies_house_no = screen.getByLabelText(/Company number/);

    const organisation_nameValue = faker.string.sample();
    const lead_applicant_emailValue = faker.internet.email();
    const first_nameValue = faker.person.firstName();
    const last_nameValue = faker.person.lastName();
    const passwordValue = "A!2sghjs";
    const confirm_passwordValue = passwordValue;
    const companies_house_noValue = "12345678";
    const tscs = screen
      .getByLabelText("Accept terms and conditions")
      .querySelector("input");
    const recaptcha = screen.getByTestId("recaptcha");

    if (
      organisation_name &&
      lead_applicant_email &&
      first_name &&
      last_name &&
      password &&
      confirm_password &&
      companies_house_no &&
      tscs
    ) {
      fireEvent.change(organisation_name, {
        target: {
          value: organisation_nameValue,
        },
      });
      fireEvent.change(lead_applicant_email, {
        target: {
          value: lead_applicant_emailValue,
        },
      });
      fireEvent.change(first_name, {
        target: {
          value: first_nameValue,
        },
      });
      fireEvent.change(last_name, {
        target: {
          value: last_nameValue,
        },
      });
      fireEvent.change(password, {
        target: {
          value: passwordValue,
        },
      });
      fireEvent.change(confirm_password, {
        target: {
          value: confirm_passwordValue,
        },
      });
      fireEvent.change(companies_house_no, {
        target: {
          value: companies_house_noValue,
        },
      });
      fireEvent.click(tscs);
      fireEvent.click(recaptcha);

      fireEvent.submit(screen.getByRole("button", { name: /Next/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    } else {
      fail(
        "Orgnisation name, Applicant email, Applicant name, company no, password, confirmPassword or tscs do not exist"
      );
    }
  });
});
