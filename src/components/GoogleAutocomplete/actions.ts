"use server";

export default async function fetchPredictions(input) {
  const GOOGLE_PLACES_AUTOCOMPLETE_URL =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const GOOGLE_PLACES_DETAILS_URL =
    "https://maps.googleapis.com/maps/api/place/details/json";
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  try {
    const autocompleteResponse = await fetch(
      `${GOOGLE_PLACES_AUTOCOMPLETE_URL}?input=${encodeURIComponent(input)}&key=${API_KEY}&types=geocode&region=uk`
    );

    if (!autocompleteResponse.ok) {
      throw new Error(
        `Error fetching autocomplete data: ${autocompleteResponse.statusText}`
      );
    }

    const autocompleteData = await autocompleteResponse.json();
    const predictions = autocompleteData.predictions || [];
    const detailedResults = await Promise.all(
      predictions.map(async prediction => {
        const detailsResponse = await fetch(
          `${GOOGLE_PLACES_DETAILS_URL}?place_id=${prediction.place_id}&key=${API_KEY}`
        );
        if (!detailsResponse.ok) {
          console.error(`Failed to fetch details for ${prediction.place_id}`);
          return { description: prediction.description, county: null };
        }
        const detailsData = await detailsResponse.json();
        const addressFields = extractCounty(detailsData.result);
        return { description: prediction.description, addressFields };
      })
    );
    return detailedResults;
  } catch (error) {
    console.error("Failed to fetch predictions or details:", error);
    return [];
  }
}

function extractCounty(result) {
  const addressComponents = result.address_components || [];
  const results = {
    postcode: "",
    addressLine1: "",
    addressLine2: "",
    town: "",
    county: "",
    country: "",
  };

  addressComponents.forEach(component => {
    if (component.types.includes("postal_code")) {
      results.postcode = component.long_name;
    }
    if (component.types.includes("street_number")) {
      results.addressLine1 = component.short_name;
    }
    if (component.types.includes("route")) {
      results.addressLine1 =
        `${results.addressLine1 || ""} ${component.long_name}`.trim();
    }
    if (component.types.includes("postal_town")) {
      results.town = component.long_name;
    }
    if (component.types.includes("administrative_area_level_2")) {
      results.county = component.long_name;
    }
    if (component.types.includes("country")) {
      results.country = component.long_name;
    }
  });
  return results;
}
