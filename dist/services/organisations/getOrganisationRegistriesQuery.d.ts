export default function getOrganisationRegistriesQuery(organisationId: number): {
    queryKeyBase: (string | number)[];
    queryFn: (queryParams: Record<string, string | number | undefined>) => Promise<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<import("..").UsersResponse>>>;
};
