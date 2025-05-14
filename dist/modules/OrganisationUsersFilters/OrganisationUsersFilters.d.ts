import { PaginatedQueryReturn } from "@/hooks/usePaginatedQuery";
import { User } from "@/types/application";
declare enum OrganisationUsersFilterKeys {
    STATUS = "status"
}
export interface OrganisationUsersFiltersProps extends Pick<PaginatedQueryReturn<User>, "updateQueryParams" | "resetQueryParams"> {
    includeFilters?: OrganisationUsersFilterKeys[];
}
export default function OrganisationUsersFilters({ updateQueryParams, resetQueryParams, includeFilters, }: OrganisationUsersFiltersProps): import("react/jsx-runtime").JSX.Element;
export {};
