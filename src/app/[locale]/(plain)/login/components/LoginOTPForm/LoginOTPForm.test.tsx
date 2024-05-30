import { VALIDATION_OTP_PASSCODE_LENGTH } from "@/consts/form";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import LoginOTPForm, { LoginOTPFormProps } from "./LoginOTPForm";

const mockSubmit = jest.fn();
const mockClickResend = jest.fn();

const renderLoginForm = (props?: Partial<LoginOTPFormProps>) => {
  return render(
    <LoginOTPForm
      mutateState={{ isLoading: false, isError: false }}
      onSubmit={mockSubmit}
      onClickResend={mockClickResend}
      {...props}
    />
  );
};

describe("<LoginOTPForm />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderLoginForm();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("does not submit when values are not defined", async () => {
    renderLoginForm();

    fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => expect(mockSubmit).not.toHaveBeenCalled());
  });

  it("shows an error", async () => {
    renderLoginForm({
      mutateState: {
        isError: true,
        isLoading: false,
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() =>
      expect(
        screen.getByText("There has been an error logging in.")
      ).toBeInTheDocument()
    );
  });

  it("requests a new validation code", async () => {
    renderLoginForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Send me another one time passcode/i,
      })
    );

    await waitFor(() => expect(mockClickResend).toHaveBeenCalled());
  });

  it("submits when values are defined", async () => {
    renderLoginForm();

    const otp = screen
      .getByLabelText("One time passcode")
      .querySelector("input");

    const otpValue = faker.string.sample(VALIDATION_OTP_PASSCODE_LENGTH);

    if (otp) {
      fireEvent.change(otp, {
        target: { value: otpValue },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    } else {
      fail("OTP does not exist");
    }
  });
});
