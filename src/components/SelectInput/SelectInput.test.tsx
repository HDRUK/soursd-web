import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectInput, { SelectInputProps } from "./SelectInput";

describe("SelectInput Component", () => {
  const mockOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const mockLabel = "Test Select";
  const mockOnChange = jest.fn();

  const defaultProps: SelectInputProps = {
    options: mockOptions,
    label: mockLabel,
    value: "",
    onChange: mockOnChange,
  };

  it("renders the SelectInput component with the correct label", () => {
    render(<SelectInput {...defaultProps} />);
    expect(screen.queryAllByText(mockLabel)[0]).toBeInTheDocument();
  });

  it("renders the correct number of options", () => {
    render(<SelectInput {...defaultProps} />);
    fireEvent.mouseDown(screen.getByRole("combobox"));

    const menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(mockOptions.length);

    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls onChange when an option is selected", () => {
    render(<SelectInput {...defaultProps} />);
    fireEvent.mouseDown(screen.getByRole("combobox"));

    const optionToSelect = screen.getByText("Option 2");
    fireEvent.click(optionToSelect);

    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });

  it("renders with the correct default value", () => {
    render(<SelectInput {...defaultProps} value="option1" />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveTextContent("Option 1");
  });
});
