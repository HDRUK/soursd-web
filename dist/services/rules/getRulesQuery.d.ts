export default function getCustodianRulesQuery(): {
    queryKey: string[];
    queryFn: () => Promise<import("../../types/requests").ResponseJson<import("./types").Rules[]>>;
};
