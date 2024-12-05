import React, { useState, useEffect } from "react";
import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";

export interface AddressFields {
  postcode?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  country?: string;
}

export interface GoogleAutocompleteProps {
  onAddressSelected: (fields: AddressFields) => void;
  label: string;
  fullWidth?: boolean;
}

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  onAddressSelected,
  label,
  fullWidth = true,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const loadGoogleMapsScript = () => {
    if (
      typeof window !== "undefined" &&
      !document.getElementById("google-maps")
    ) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.id = "google-maps";
      script.async = true;
      script.onload = () => setGoogleLoaded(true);
      document.head.appendChild(script);
    } else if (typeof window !== "undefined") {
      setGoogleLoaded(true);
    }
  };

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const getPlacePredictions = (
    input: string
  ): Promise<google.maps.places.AutocompletePrediction[]> => {
    return new Promise((resolve, reject) => {
      if (!googleLoaded || !input) {
        resolve([]);
        return;
      }

      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input,
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            resolve(predictions);
          } else {
            reject(status);
          }
        }
      );
    });
  };

  const fetchPredictions = async (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }
    const predictions = await getPlacePredictions(value);
    setOptions(predictions.map(prediction => prediction.description));
  };

  const parseAddressComponents = (
    addressComponents: google.maps.GeocoderAddressComponent[]
  ): AddressFields => {
    const fields: AddressFields = {};

    addressComponents.forEach(component => {
      if (component.types.includes("postal_code")) {
        fields.postcode = component.long_name;
      }
      if (component.types.includes("street_number")) {
        fields.addressLine1 = component.short_name;
      }
      if (component.types.includes("route")) {
        fields.addressLine1 =
          `${fields.addressLine1 || ""} ${component.long_name}`.trim();
      }
      if (component.types.includes("postal_town")) {
        fields.town = component.long_name;
      }
      if (component.types.includes("administrative_area_level_2")) {
        fields.county = component.long_name;
      }
      if (component.types.includes("country")) {
        fields.country = component.long_name;
      }
    });

    return fields;
  };

  const handleOptionSelect = async (selectedValue: string) => {
    const predictions = await getPlacePredictions(selectedValue);
    const selectedPrediction = predictions.find(
      p => p.description === selectedValue
    );
    if (selectedPrediction) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(
        { placeId: selectedPrediction.place_id },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const fields = parseAddressComponents(
              place.address_components || []
            );
            onAddressSelected(fields);
          }
        }
      );
    }
  };

  const handleInputChange = (_: React.SyntheticEvent, newValue: string) => {
    setInputValue(newValue);
    fetchPredictions(newValue);
  };

  return (
    <MUIAutocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={(_, selectedValue) =>
        handleOptionSelect(selectedValue as string)
      }
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          fullWidth={fullWidth}
          {...rest}
          size="small"
        />
      )}
    />
  );
};

export default GoogleAutocomplete;
