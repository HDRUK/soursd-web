import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GoogleAutocomplete from "./GoogleAutocomplete";

describe("GoogleAutocomplete", () => {
  const mockOnAddressSelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    global.google = {
      maps: {
        places: {
          AutocompleteService: function PlacesServices() {
            return {
              getPlacePredictions: (
                { input }: { input: string },
                callback: (
                  predictions: { description: string }[] | null,
                  status: string
                ) => void
              ) => {
                if (input) {
                  callback([{ description: "123 Test St, Test City" }], "OK");
                } else {
                  callback(null, "ZERO_RESULTS");
                }
              },
            };
          },
          PlacesService: function PlacesServices() {
            return {
              getDetails: (
                { placeId }: { placeId: string },
                callback: (
                  place: {
                    address_components: {
                      long_name: string;
                      types: string[];
                    }[];
                  } | null,
                  status: string
                ) => void
              ) => {
                if (placeId) {
                  callback(
                    {
                      address_components: [
                        { long_name: "123", types: ["street_number"] },
                        { long_name: "Test St", types: ["route"] },
                        { long_name: "Test City", types: ["postal_town"] },
                        {
                          long_name: "Test County",
                          types: ["administrative_area_level_2"],
                        },
                        { long_name: "Test Country", types: ["country"] },
                        { long_name: "12345", types: ["postal_code"] },
                      ],
                    },
                    "OK"
                  );
                } else {
                  callback(null, "NOT_FOUND");
                }
              },
            };
          },
          PlacesServiceStatus: {
            OK: "OK",
          },
        },
      },
    };
  });

  it("loads Google Maps script and renders input", async () => {
    render(
      <GoogleAutocomplete
        label="Test Label"
        onAddressSelected={mockOnAddressSelected}
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
  });

  it("fetches predictions and displays them", async () => {
    render(
      <GoogleAutocomplete
        label="Test Label"
        onAddressSelected={mockOnAddressSelected}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Test" } });

    await waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options.length).toBe(1);
      expect(options[0]).toHaveTextContent("123 Test St, Test City");
    });
  });

  it("handles empty input gracefully", async () => {
    render(
      <GoogleAutocomplete
        label="Test Label"
        onAddressSelected={mockOnAddressSelected}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });
});
