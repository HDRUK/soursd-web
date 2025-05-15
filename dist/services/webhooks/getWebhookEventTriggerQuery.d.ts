export default function getWebhookEventTriggerQuery(): {
    queryKey: string[];
    queryFn: () => Promise<import("../../types/requests").ResponseJson<import("./types").WebhookEventTriggers[]>>;
};
