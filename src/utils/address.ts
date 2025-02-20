import { AddressFields } from "@/types/application";

const formatAddress = (a: AddressFields) =>
  [a.address_1, a.address_2, a.town, a.postcode, a.country]
    .filter(Boolean)
    .join(", ");

export { formatAddress };
