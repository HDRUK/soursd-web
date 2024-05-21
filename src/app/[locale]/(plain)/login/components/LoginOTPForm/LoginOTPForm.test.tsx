import { VALIDATION_OTP_PASSCODE_LENGTH } from "@/consts/form";
import { act, fireEvent, render, screen } from "@/utils/testUtils";
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

describe("<LoginForm />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderLoginForm();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("does not submit when values are not defined", async () => {
    renderLoginForm();

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("shows an error", async () => {
    renderLoginForm({
      mutateState: {
        isError: true,
        isLoading: false,
      },
    });

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));
    });

    expect(
      screen.getByText("There has been an error logging in.")
    ).toBeInTheDocument();
  });

  it("requests a new validation code", async () => {
    renderLoginForm();

    await act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /Send me another one time passcode/i,
        })
      );
    });

    expect(mockClickResend).toHaveBeenCalled();
  });

  it("submits when values are defined", async () => {
    renderLoginForm();

    const otp = screen
      .getByLabelText("One time passcode")
      .querySelector("input");

    const otpValue = faker.string.sample(VALIDATION_OTP_PASSCODE_LENGTH);

    if (otp) {
      await act(() => {
        fireEvent.change(otp, {
          target: { value: otpValue },
        });

        fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));
      });

      expect(mockSubmit).toHaveBeenCalled();
    } else {
      fail("OTP does not exist");
    }
  });
});
