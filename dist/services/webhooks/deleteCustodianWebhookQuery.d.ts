export default function deleteCustodianWebhookQuery(custodianId: number): {
    mutationKey: string[];
    mutationFn: (payload: {
        id: number;
    }) => Promise<import("../../types/requests").ResponseJson<null>>;
};
