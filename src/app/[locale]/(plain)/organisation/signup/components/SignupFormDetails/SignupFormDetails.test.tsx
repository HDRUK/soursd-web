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
        lead_applicant_organisation_email: "",
        lead_applicant_organisation_name: "",
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

    act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Next/i }));
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits when values are defined", async () => {
    renderSignupForm();

    const organisation_name = screen.getByLabelText(/Organisation name/);
    const lead_applicant_organisation_email =
      screen.getByLabelText(/Applicant email/);
    const lead_applicant_organisation_name =
      screen.getByLabelText(/Applicant name/);
    const password = screen.getByLabelText(/Password/);
    const confirm_password = screen.getByLabelText(/Confirm password/);
    const companies_house_no = screen.getByLabelText(/Company number/);

    const organisation_nameValue = faker.string.sample();
    const lead_applicant_organisation_emailValue = faker.internet.email();
    const lead_applicant_organisation_nameValue = faker.string.sample();
    const passwordValue = "A!2sghjs";
    const confirm_passwordValue = passwordValue;
    const companies_house_noValue = "12345678";
    const tscs = screen
      .getByLabelText("Accept terms and conditions")
      .querySelector("input");
    const recaptcha = screen.getByTestId("recaptcha");

    if (
      organisation_name &&
      lead_applicant_organisation_email &&
      lead_applicant_organisation_name &&
      password &&
      confirm_password &&
      companies_house_no &&
      tscs
    ) {
      act(() => {
        fireEvent.change(organisation_name, {
          target: {
            value: organisation_nameValue,
          },
        });
        fireEvent.change(lead_applicant_organisation_email, {
          target: {
            value: lead_applicant_organisation_emailValue,
          },
        });
        fireEvent.change(lead_applicant_organisation_name, {
          target: {
            value: lead_applicant_organisation_nameValue,
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
      });

      waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    } else {
      fail(
        "Orgnisation name, Applicant email, Applicant name, company no, password, confirmPassword or tscs do not exist"
      );
    }
  });
});
