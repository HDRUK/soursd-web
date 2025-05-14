export default function getOrganisationRegistriesQuery(organisationId: number): {
    queryKeyBase: (string | number)[];
    queryFn: (queryParams: Record<string, string | number | undefined>) => Promise<ResponseJson<Paged<import("..").UsersResponse>>>;
};
