import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import SignupFormContacts, {
  SignupFormContactsProps,
} from "./SignupFormContacts";

const mockOnSubmit = jest.fn();
const mockOnPrevious = jest.fn();

const DEFAULT_FORM_VALUES = {
  dpo_name: "",
  dpo_email: "",
  hr_name: "",
  hr_email: "",
};

const renderSignupForm = (props?: Partial<SignupFormContactsProps>) => {
  return render(
    <SignupFormContacts
      defaultValues={DEFAULT_FORM_VALUES}
      onSubmit={mockOnSubmit}
      onPrevious={mockOnPrevious}
      mutateState={{
        isError: false,
        isLoading: false,
        error: null,
      }}
      {...props}
    />
  );
};

describe("<SignupFormContacts />", () => {
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

    fireEvent.submit(screen.getByRole("button", { name: /Sign up/i }));

    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
  });

  it("submits when values are defined", async () => {
    renderSignupForm();

    const hr_name = screen.getByLabelText(/Name of HR contact/);
    const hr_email = screen.getByLabelText(/Email of HR contact/);
    const dpo_name = screen.getByLabelText(/Name of data protection contact/);
    const dpo_email = screen.getByLabelText(/Email of data protection contact/);

    const hr_nameValue = faker.string.sample();
    const hr_emailValue = faker.internet.email();
    const dpo_nameValue = faker.string.sample();
    const dpo_emailValue = faker.internet.email();

    if (hr_nameValue && hr_emailValue && dpo_nameValue && dpo_emailValue) {
      fireEvent.change(hr_name, {
        target: {
          value: hr_nameValue,
        },
      });
      fireEvent.change(hr_email, {
        target: {
          value: hr_emailValue,
        },
      });
      fireEvent.change(dpo_name, {
        target: {
          value: dpo_nameValue,
        },
      });
      fireEvent.change(dpo_email, {
        target: {
          value: dpo_emailValue,
        },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Sign up/i }));

      await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
    } else {
      fail(
        "Orgnisation name, Applicant email, Applicant name, company no, password, confirmPassword or tscs do not exist"
      );
    }
  });
});
