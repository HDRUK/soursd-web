import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AutocompleteInput from "./AutocompleteInput";

describe("AutocompleteInput Component", () => {
  const mockOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  const mockOnChange = jest.fn();

  it("renders the AutocompleteInput with the correct label and placeholder", () => {
    render(
      <AutocompleteInput
        options={mockOptions}
        label="Test Label"
        value={null}
        onChange={mockOnChange}
        placeholder="Test Placeholder"
      />
    );

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("displays the correct options in the dropdown", () => {
    render(
      <AutocompleteInput
        options={mockOptions}
        label="Test Label"
        value={null}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText("Test Label");
    fireEvent.mouseDown(input);

    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls onChange with the correct value when an option is selected", () => {
    render(
      <AutocompleteInput
        options={mockOptions}
        label="Test Label"
        value={null}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText("Test Label");
    fireEvent.mouseDown(input);

    const optionToSelect = screen.getByText("Option 2");
    fireEvent.click(optionToSelect);

    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });

  it("displays the correct value when one is selected", () => {
    render(
      <AutocompleteInput
        options={mockOptions}
        label="Test Label"
        value="option1"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
  });
});
