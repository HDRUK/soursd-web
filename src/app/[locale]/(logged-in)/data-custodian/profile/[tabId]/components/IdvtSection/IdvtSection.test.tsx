import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
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
  commonAccessibilityTests(render(<TestComponent />));

  it("changes the idvt value", async () => {
    render(<TestComponent />);

    const idvtRequired = screen.getByRole("checkbox");

    fireEvent.click(idvtRequired);

    await waitFor(() => {
      expect((idvtRequired as HTMLInputElement).checked).toBe(true);
    });
  });
});
