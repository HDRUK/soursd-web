import { FormProvider, useForm } from "react-hook-form";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "../../utils/testUtils";
import PasswordTextField from ".";

const PasswordTextFieldWithProvider = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <PasswordTextField
        id="password"
        label="Password"
        aria-label="Password"
        placeholder="Password"
        iconButtonProps={{ "aria-label": "toggle password" }}
      />
    </FormProvider>
  );
};

describe("<PasswordTextField />", () => {
  it("displays error state when values are not defined", async () => {
    render(<PasswordTextFieldWithProvider />);

    await act(() => {
      fireEvent.click(screen.getByLabelText("toggle password"));
    });

    expect(screen.getByTestId("visibility-off")).toBeTruthy();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<PasswordTextFieldWithProvider />));
  });
});
