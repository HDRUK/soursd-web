import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextField } from "@mui/material";
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
        renderInput={params => (
          <TextField
            {...params}
            label="Select an option"
            placeholder="Choose an option"
            variant="outlined"
            size="small"
          />
        )}
      />
    );

    expect(screen.getByLabelText("Select an option")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Choose an option")).toBeInTheDocument();
  });

  it("displays the correct options in the dropdown", () => {
    render(
      <AutocompleteInput
        options={mockOptions}
        label="Test Label"
        value={null}
        onChange={mockOnChange}
        renderInput={params => (
          <TextField
            {...params}
            label="Select an option"
            placeholder="Choose an option"
            variant="outlined"
            size="small"
          />
        )}
      />
    );

    const input = screen.getByLabelText("Select an option");
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
        renderInput={params => (
          <TextField
            {...params}
            label="Select an option"
            placeholder="Choose an option"
            variant="outlined"
            size="small"
          />
        )}
      />
    );

    const input = screen.getByLabelText("Select an option");
    fireEvent.mouseDown(input);

    const optionToSelect = screen.getByText("Option 2");
    fireEvent.click(optionToSelect);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("displays the correct value when one is selected", () => {
    render(
      <AutocompleteInput
        options={mockOptions}
        label="Test Label"
        value={mockOptions[0]}
        onChange={mockOnChange}
        renderInput={params => (
          <TextField
            {...params}
            label="Select an option"
            placeholder="Choose an option"
            variant="outlined"
            size="small"
          />
        )}
      />
    );

    expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
  });
});
