import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { ResearcherProject } from "@/types/application";
export declare enum ProjectFilterKeys {
    DATE = "date",
    STATUS = "status"
}
export interface ProjectsProps extends Pick<PaginatedQueryReturn<ResearcherProject>, "updateQueryParams" | "resetQueryParams" | "handleSortToggle" | "handleFieldToggle" | "queryParams"> {
    includeFilters?: ProjectFilterKeys[];
}
export default function ProjectsFilters({ handleSortToggle, handleFieldToggle, resetQueryParams, updateQueryParams, queryParams, includeFilters, }: ProjectsProps): import("react/jsx-runtime").JSX.Element;
