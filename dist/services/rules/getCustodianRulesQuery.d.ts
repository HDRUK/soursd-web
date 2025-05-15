export default function getCustodianRulesQuery(id?: number): {
    queryKey: (string | number | undefined)[];
    queryFn: ({ queryKey }: {
        queryKey: any;
    }) => Promise<import("../../types/requests").ResponseJson<import("./types").Rules[]>>;
};
