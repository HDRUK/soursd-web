import React from "react";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  waitFor,
  screen,
} from "@/utils/testUtils";
import AddressForm from "./AddressForm"; // adjust the path as needed
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("AddressForm", () => {
  const renderAddressForm = () =>
    render(
      <Wrapper>
        <AddressForm name="address" />
      </Wrapper>
    );

  it("updates form values when an address is selected from GoogleAutocomplete", async () => {
    renderAddressForm();

    const fieldValues = [
      { testId: "address.address_1", value: "123 Random Street" },
      { testId: "address.address_2", value: "Apt 456" },
      { testId: "address.town", value: "Random Town" },
      { testId: "address.postcode", value: "12345" },
    ];

    fieldValues.forEach(({ testId, value }) => {
      fireEvent.change(screen.getByTestId(testId).querySelector("input")!, {
        target: { value },
      });
    });

    await waitFor(() => {
      fieldValues.forEach(({ testId, value }) => {
        const input = screen.getByTestId(testId).querySelector("input")!;
        expect(input).toHaveValue(value);
      });
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderAddressForm());
  });
});
