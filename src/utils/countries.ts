import { Option } from "@/types/common";
import { countries } from "countries-list";

/**
 * Get the country code for a given country name
 * @param countryName - The name of the country
 * @returns The country code (e.g., "US") or null if not found
 */
export function getCountryCode(countryName: string): string | null {
  const entry = Object.entries(countries).find(
    ([, details]) => details.name.toLowerCase() === countryName.toLowerCase()
  );

  return entry ? entry[0] : null;
}

/**
 * Function to get country options sorted alphabetically
 * @returns {Option[]} An array of country options with value (code) and label (name)
 */
export function getCountryOptions(useCountryCode = true): Option[] {
  return Object.entries(countries)
    .map(([code, { name }]) => ({
      value: useCountryCode ? code : name,
      label: name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
