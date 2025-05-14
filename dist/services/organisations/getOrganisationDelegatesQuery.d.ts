export default function getOrganisationDelegatesQuery(organisationId: number, enabled: boolean): {
    queryKey: (string | number)[];
    queryFn: ({ queryKey }: {
        queryKey: any;
    }) => Promise<ResponseJson<import("..").UsersResponse>>;
    enabled: boolean;
};
