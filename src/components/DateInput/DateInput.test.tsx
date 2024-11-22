import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateInput, { DateInputProps } from "./DateInput";

describe("DateInput Component", () => {
  const defaultProps: DateInputProps = {
    label: "Select a date",
    value: null,
    onChange: jest.fn(),
    dataTestId: "date-input",
  };

  it("renders the component with a label", () => {
    render(<DateInput {...defaultProps} />);
    // Check if the label is rendered
    expect(screen.queryAllByText("Select a date")[0]).toBeInTheDocument();
  });

  it("renders the DatePicker inside the LocalizationProvider", () => {
    render(<DateInput {...defaultProps} />);
    // Check if the date input field is rendered
    expect(
      screen.getByRole("textbox", { name: "Choose date" })
    ).toBeInTheDocument();
  });

  it("displays the correct value when a date is provided", () => {
    const date = new Date("2024-11-20");
    render(<DateInput {...defaultProps} value={date} />);

    // Ensure the input displays the correct date
    const input = screen.getByRole("textbox", {
      name: "Choose date, selected date is Nov 20, 2024",
    }) as HTMLInputElement;
    expect(input.value).toBe("11/20/2024");
  });

  it("displays an empty value when no date is provided", () => {
    render(<DateInput {...defaultProps} value={null} />);

    // Ensure the input is empty if no value is provided
    const input = screen.getByRole("textbox", {
      name: "Choose date",
    }) as HTMLInputElement;
    expect(input.value).toBe("");
  });
});
