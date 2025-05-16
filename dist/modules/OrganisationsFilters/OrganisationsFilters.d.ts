import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { Organisation } from "@/types/application";
export declare enum OrganisationsFilterKeys {
    STATUS = "status"
}
export interface OrganisationsFilterProps extends Pick<PaginatedQueryReturn<Organisation>, "updateQueryParams" | "resetQueryParams" | "handleSortToggle" | "handleFieldToggle" | "queryParams"> {
    includeFilters?: OrganisationsFilterKeys[];
}
export default function OrganisationsFilters({ handleSortToggle, handleFieldToggle, resetQueryParams, updateQueryParams, queryParams, includeFilters, }: OrganisationsFilterProps): import("react/jsx-runtime").JSX.Element;
