import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateInput, { DateInputProps } from "./DateInput";

jest.mock("@mui/x-date-pickers/DatePicker", () => ({
  DatePicker: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
  }) => {
    const id = "date-input";
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          data-testid={id}
          id={id}
          type="date"
          value={value ? value.toISOString().split("T")[0] : ""}
          onChange={e => onChange(new Date(e.target.value))}
        />
      </div>
    );
  },
}));

describe("DateInput Component", () => {
  const defaultProps: DateInputProps = {
    label: "Select a date",
    value: null,
    onChange: jest.fn(),
  };

  it("renders the component with a label", () => {
    render(<DateInput {...defaultProps} />);
    // Check if the label is rendered
    expect(screen.getByText("Select a date")).toBeInTheDocument();
  });

  it("renders the DatePicker inside the LocalizationProvider", () => {
    render(<DateInput {...defaultProps} />);
    // Check if the date input field is rendered
    expect(screen.getByTestId("date-input")).toBeInTheDocument();
  });

  it("calls onChange when a new date is selected", () => {
    const handleChange = jest.fn();
    render(<DateInput {...defaultProps} onChange={handleChange} />);

    // Simulate changing the date input value
    const input = screen.getByTestId("date-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2024-11-20" } });

    // Check that the onChange function was called with the correct date
    expect(handleChange).toHaveBeenCalledWith(new Date("2024-11-20"));
  });

  it("displays the correct value when a date is provided", () => {
    const date = new Date("2024-11-20");
    render(<DateInput {...defaultProps} value={date} />);

    // Ensure the input displays the correct date
    const input = screen.getByTestId("date-input") as HTMLInputElement;
    expect(input.value).toBe("2024-11-20");
  });

  it("displays an empty value when no date is provided", () => {
    render(<DateInput {...defaultProps} value={null} />);

    // Ensure the input is empty if no value is provided
    const input = screen.getByTestId("date-input") as HTMLInputElement;
    expect(input.value).toBe("");
  });
});
