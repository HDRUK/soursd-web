export default function getCustodianRulesQuery(id?: number): {
    queryKey: (string | number | undefined)[];
    queryFn: ({ queryKey }: {
        queryKey: any;
    }) => Promise<ResponseJson<import("./types").Rules[]>>;
};
