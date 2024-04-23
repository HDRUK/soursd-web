import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { FormProvider, useForm } from "react-hook-form";
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
  it("has no accessibility validations", async () => {
    const { container } = render(<PasswordTextFieldWithProvider />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("displays error state when values are not defined", async () => {
    render(<PasswordTextFieldWithProvider />);

    await act(() => {
      fireEvent.click(screen.getByLabelText("toggle password"));
    });

    expect(screen.getByTestId("visibility-off")).toBeTruthy();
  });
});
