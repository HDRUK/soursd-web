export default function getCustodianRulesQuery(): {
    queryKey: string[];
    queryFn: () => Promise<ResponseJson<import("./types").Rules[]>>;
};
