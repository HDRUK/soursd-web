import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { FormProvider, useForm } from "react-hook-form";
import IdvtSection, { IdvtSectionProps } from "./IdvtSection";

const TestComponent = (props?: Partial<IdvtSectionProps>) => {
  const methods = useForm<{ idvt: boolean }>({
    defaultValues: {
      idvt: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <IdvtSection
        switchProps={{
          name: "idvt",
        }}
        {...props}
      />
    </FormProvider>
  );
};

describe("<Details />", () => {
  it("has no accessibility validations", async () => {
    const { container } = render(<TestComponent />);

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("changes the idvt value", async () => {
    render(<TestComponent />);

    const idvtRequired = screen.getByRole("checkbox");

    fireEvent.click(idvtRequired);

    await waitFor(() => {
      expect((idvtRequired as HTMLInputElement).checked).toBe(true);
    });
  });
});
